# Next Portfolio

This is a portfolio website built with Next.js. It is designed to showcase my work and skills as a developer. The website is responsive and optimized for performance.

## Getting Started

Make sure you have Node.js and pnpm installed on your machine. This are defined in the `engines` field of `package.json`.

Install dependencies

```bash
pnpm install
```

Run the development server

```bash
pnpm dev
```

## Linting & Formatting

Staged files are automatically linted with ESLint and formatted with Prettier on each commit. The commit is aborted if any issues remain unfixed.

For security reasons, scripts are ignored on install. For setting up Husky, run:

```bash
pnpm prepare
```

## Building for production

Build the application for production

```bash
pnpm build
```

Start the production server

```bash
pnpm start
```

## Authentication

This project uses Auth0 for authentication. `AUTH0_SECRET` is used to encrypt the session cookie. For production, generate your own secret using `openssl rand -hex 32` and set it in the `.env` file.
