# raskatov.efiand.ru

Литературный MPA (книга + рукопись) на [site-core](https://github.com/efiand/site-core). Подключение, CLI, импорты, postinstall — [README site-core](https://github.com/efiand/site-core#readme).

## Для разработчика

- `npm run dev` — локальный сервер с SSE reload.
- `npm test` — build + тесты.

## CI и deploy

Push в `main`: **lint + test всегда**; **deploy по умолчанию** после зелёного CI.

| Маркер в commit message | CI | Deploy |
| ----------------------- | -- | ------ |
| *(нет)* | ✅ | ✅ |
| `[no-deploy]` | ✅ | ❌ |
| `[WIP]` | ✅ | ❌ |
| `[skip` (`[skip ci]` …) | ❌ | ❌ |

Подробнее — [workflow-core.mdc](.cursor/rules/site-core/workflow-core.mdc).
