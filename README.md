# Backend (NestJS)

NestJS API for the CMS. Uses MongoDB via Mongoose and JWT auth.

## Prerequisites

- Node.js and npm
- MongoDB running locally or a connection string

## Setup

```bash
cd backend
npm install
```

Create an `.env` file (see `.env.example`).

## Environment variables

These are validated in `ConfigModule` (`src/app.module.ts`). Defaults shown.

```env
# Node / server
NODE_ENV=development
PORT=5001

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/cms

# CORS
DEVELOPMENT_CORS_ORIGIN=http://localhost:5201
PRODUCTION_CORS_ORIGIN=

# Auth / JWT
JWT_SECRET=change-me-please
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

## Scripts

- Start (dev watch): `npm run start:dev`
- Start (dev): `npm run start`
- Start (prod): `npm run start:prod`
- Build: `npm run build`
- Lint: `npm run lint` | Fix: `npm run lint:fix`
- Test: `npm test` | Watch: `npm run test:watch` | Coverage: `npm run test:cov` | E2E: `npm run test:e2e`

## Running

```bash
# dev
npm run start:dev
# prod (after build)
npm run build && npm run start:prod
```

- Base URL: `http://localhost:${PORT}/api/v1` (default `http://localhost:5001/api/v1`)
- Swagger docs: `http://localhost:${PORT}/docs`

## Project structure

- `src/auth/` – login, register, refresh, JWT strategies
- `src/user/` – user CRUD, profile
- `src/article/` – article feature
- `src/common/` – shared utilities, DTOs

## License

MIT. See the repository root `LICENSE` file.

## Author

Antony Rone Oliver — roneootan611@gmail.com
