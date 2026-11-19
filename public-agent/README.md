# Public Snowy Agent

Stateless public portfolio assistant for dannlabs.my.id.

- No Hermes connection.
- No shell, browser, GitHub, Telegram, or filesystem tools.
- Public knowledge only.
- SQLite activity audit log.
- SSE activity trace for the visitor.
- External OpenAI-compatible provider configured at runtime.

Run locally:

```bash
SNOWY_PUBLIC_PROVIDER_URL=http://127.0.0.1:1234/v1 \
SNOWY_PUBLIC_MODEL=local-model \
python3 server.py
```

The provider key is never sent to the browser. `/api/snowy` returns SSE. `/api/health` is public. `/api/logs` requires `SNOWY_ADMIN_TOKEN`.
