const API = '/api/snowy';
const FALLBACK = 'Snowy is resting right now. Please browse the selected work above instead.';

function parseSse(buffer) {
  const events = [];
  const parts = buffer.split('\n\n');
  const rest = parts.pop();
  for (const part of parts) {
    let kind = 'message';
    let data = '';
    for (const line of part.split('\n')) {
      if (line.startsWith('event: ')) kind = line.slice(7);
      else if (line.startsWith('data: ')) data += line.slice(6);
    }
    try { events.push([kind, JSON.parse(data)]); } catch { /* ignore malformed frame */ }
  }
  return { events, rest };
}

export function initSnowy() {
  const form = document.querySelector('#snowy-form');
  const input = document.querySelector('#snowy-input');
  const submit = form.querySelector('button');
  const response = document.querySelector('#snowy-response');
  const activity = document.querySelector('#snowy-activity');
  const cat = document.querySelector('#snowy-cat');
  const session = crypto.randomUUID().replaceAll('-', '').slice(0, 24);

  const addActivity = (label, cls = '') => {
    activity.hidden = false;
    const li = document.createElement('li');
    li.textContent = label;
    if (cls) li.className = cls;
    activity.append(li);
  };
  const setBusy = (busy) => {
    input.disabled = submit.disabled = busy;
    cat.classList.toggle('is-thinking', busy);
  };

  async function ask(question) {
    setBusy(true);
    activity.replaceChildren();
    response.className = 'bubble response';
    response.textContent = 'Snowy is thinking…';
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, session }),
      });
      if (res.status === 429) throw new Error('Too many questions for now. Please try again in a few minutes.');
      if (!res.ok || !res.body) throw new Error(FALLBACK);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parsed = parseSse(buffer);
        buffer = parsed.rest;
        for (const [kind, data] of parsed.events) {
          if (kind === 'activity') addActivity(data.label);
          else if (kind === 'source') addActivity(`Source: ${data.label}`, 'is-source');
          else if (kind === 'answer') response.textContent = data.text;
          else if (kind === 'completed' && data.answer) response.textContent = data.answer;
          else if (kind === 'blocked') { addActivity('Outside the public scope', 'is-blocked'); response.textContent = data.message; }
          else if (kind === 'error') { response.classList.add('is-error'); response.textContent = data.message; }
        }
      }
    } catch (err) {
      response.classList.add('is-error');
      response.textContent = err.message || FALLBACK;
    } finally {
      setBusy(false);
    }
  }

  document.querySelectorAll('[data-snowy-prompt]').forEach((button) =>
    button.addEventListener('click', () => { input.value = button.dataset.snowyPrompt; ask(input.value); }));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (question) ask(question);
  });
}
