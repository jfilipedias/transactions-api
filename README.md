# Transactions API

This is a REST API made with [fastify](https://fastify.dev/) and [knex](https://knexjs.org/) to handle users transactions. It handles the user's session ID through cookies, so the user can only see their own transaction. The test suit used in this project is [Vitest](https://vitest.dev/) with [SuperTest](https://github.com/ladjs/supertest) to handle end-to-end tests.

## Getting Started

To run this project you must be using the Node.js on the version [v20.9.0](https://nodejs.org/dist/v20.9.0/) or greater.

Setups the environment variables on a `.env` file based on the [.env.example](.env.example) file.

Run the database migrations:

```shell
npm run knex -- migrate:latest
```

Run the server:

```shell
npm run dev
```

To run the test suit, you must create a `.env.test` file similar to the `.env` created earlier, however there is no need to define the `NODE_ENV` variable because it will be configured by Vitest. Then you can run the following command:

```shell
npm run test
```

## App Requirements

### Business Rules

- [x] Credit transaction must add to the total account balance;
- [x] Debit transaction must subtract from the total account balance;
- [x] Must be able to identify the user between requests;
- [x] Users should only be able to see transactions they create;

### Functional Requirements

- [x] User must be able to create a new transaction;
- [x] User must be able to get a account statement;
- [x] User must be able to list all existing transactions;
- [x] User must be able to list a single transaction;

## Dependencies

- [dotenv](https://dotenv.org/)
- [ESLint](https://eslint.org/)
- [fastify](https://fastify.dev/)
- [Prettier](https://prettier.io/)
- [knex](https://knexjs.org/)
- [zod](https://zod.dev/)
- [SuperTest](https://github.com/ladjs/supertest)
- [tsx](https://github.com/privatenumber/tsx)
- [tsup](https://tsup.egoist.dev/)
- [TypeScript](https://typescriptlang.org)
- [Vitest](https://vitest.dev/)
