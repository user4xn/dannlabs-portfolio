# Dannlabs Portfolio — visual contract

## Product surface

This is a **Decide / Learn** portfolio: the first viewport must explain who Wildan is and why the work matters. Snowy is the single interactive proof point, not the page shell.

## Composition

- No personal avatar or portrait in the hero.
- Hero is left-aligned and intentionally wide; content sits inside a centered 1080px reading frame with generous outer whitespace.
- Work is an alternating editorial list, not a repeated feature-card grid.
- Agent engineering is a dark technical interruption after human context and selected work.
- Snowy is a two-column conversation scene with a visible white-cat identity and live activity timeline.

## Type and color

- Display: DM Serif Display.
- Text: DM Sans.
- Metadata: JetBrains Mono.
- Surface: warm paper `#f4f0e8`; ink `#171714`; rust accent `#b84d2f`; dark technical band `#17191b`.
- Use the rust only for actions, emphasis, sources, and Snowy's active state.

## Spacing and motion

- Primary frame: `min(1080px, calc(100% - clamp(48px, 12vw, 200px)))`.
- Section rhythm: 100px desktop / 68px mobile.
- Motion families: reveal-on-enter, project image lift, Snowy state animation, cursor swarm.
- No scroll hijacking. No animation may hide content. Reduced motion disables swarm and keeps content visible.

## Snowy contract

Snowy is a public agent, not a keyword bot:

- Browser calls `POST /api/snowy` and consumes SSE.
- Public events are `activity`, `source`, `answer`, and `completed`.
- Provider is a dedicated OpenAI-compatible runtime key, never Hermes credentials.
- Agent is stateless; audit stores hashed input and operational events only.
- No private tools, memory, repositories, Telegram, shell, or raw chain-of-thought.
- If provider configuration is absent, the service reports degraded/unavailable behavior; it must not pretend that keyword retrieval is an LLM.
