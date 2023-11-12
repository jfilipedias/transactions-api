# Transactions API

This is a REST API made with [fastify](https://fastify.dev/) and [knex](https://knexjs.org/) to handle users transactions. It handles the user's session ID through cookies, so the user can only see their own transaction.

## Getting Started

Setups the environment variables based on [.env.example](.env.example) file in the project root.

Run the database migrations:

```shell
npm run knex -- migrate:latest
```

Run the server:

```shell
npm run dev
```

## App Requirements

### Business Rules

[x] Credit transaction must add to the total account balance;
[x] Debit transaction must subtract from the total account balance;
[x] Must be able to identify the user between requests;
[x] Users should only be able to see transactions they create;

### Functional Requirements

[x] User must be able to create a new transaction;
[x] User must be able to get a account statement;
[x] User must be able to list all existing transactions;
[x] User must be able to list a single transaction;

## Dependencies

- [dotenv](https://dotenv.org/)
- [ESLint](https://eslint.org/)
- [fastify](https://fastify.dev/)
- [Prettier](https://prettier.io/)
- [knex](https://knexjs.org/)
- [zod](https://zod.dev/)
- [tsx](https://github.com/privatenumber/tsx)
- [TypeScript](https://typescriptlang.org)
