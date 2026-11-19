import { projects } from './data/projects.js';
import './styles/index.css';

const projectList = document.querySelector('#project-list');
projectList.innerHTML = projects.map((p, i) => `
  <article class="project" data-project="${p.id}">
    <div class="project-media"><img src="${p.image}" alt="${p.title} project visual" loading="lazy"></div>
    <div class="project-copy">
      <span class="project-meta">${String(i + 1).padStart(2, '0')} · ${p.year} · ${p.category}</span>
      <h3>${p.title}</h3><p>${p.description}</p>
      <p class="project-stack">${p.stack.join(' · ')}</p>
      <p class="project-status">${p.status}</p>
    </div>
  </article>`).join('');

const swarm = document.querySelector('#swarm');
const nodes = Array.from({ length: 7 }, (_, i) => { const n = document.createElement('span'); n.className = 'swarm-node'; n.dataset.i = i; swarm.append(n); return n; });
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
let points = nodes.map(() => ({ ...mouse }));
addEventListener('pointermove', (e) => { mouse = { x: e.clientX, y: e.clientY }; });
function animateSwarm() { points = points.map((p, i) => ({ x: p.x + (mouse.x + Math.sin(i * 2.2) * (8 + i * 3) - p.x) * (.18 - i * .012), y: p.y + (mouse.y + Math.cos(i * 1.7) * (8 + i * 3) - p.y) * (.18 - i * .012) })); nodes.forEach((n, i) => { n.style.transform = `translate(${points[i].x}px,${points[i].y}px)`; }); requestAnimationFrame(animateSwarm); }
animateSwarm();

const cat = document.querySelector('#snowy-cat');
const response = document.querySelector('#snowy-response');
const input = document.querySelector('#snowy-input');
const prompts = { 'What did Wildan build with RabbitMQ?': 'Lemparkoin used RabbitMQ to separate payment processing from the wallet API, so settlement could scale and fail independently.', 'How does the agent office work?': 'Snowy routes work, Poki scopes it, Beluga builds it, and Zero verifies it in a separate context. The public demo is bounded and does not touch private systems.', 'Show me a payment system.': 'Lemparkoin is the clearest public example: wallet top-up, withdrawal, platform fee, transaction history, payment events, and settlement workers.' };
function answer(text) { cat.classList.add('thinking'); response.textContent = 'Snowy is thinking…'; setTimeout(() => { response.textContent = prompts[text] || 'The public demo knows the selected portfolio work. Try asking about payments, RabbitMQ, logistics, or the agent office.'; cat.classList.remove('thinking'); }, 650); }
document.querySelectorAll('[data-prompt]').forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.prompt; answer(b.dataset.prompt); }));
document.querySelector('#snowy-form').addEventListener('submit', (e) => { e.preventDefault(); const text = input.value.trim(); if (text) answer(text); });

const year = document.querySelector('footer span'); if (year) year.textContent = `© ${new Date().getFullYear()} Wildan Kurnia Candra`;
