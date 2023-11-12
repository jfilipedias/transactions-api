# Transactions API

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

[ ] Credit transaction must add to the total account balance;
[ ] Debit transaction must subtract from the total account balance;
[ ] Must be able to identify the user between requests;
[ ] Users should only be able to see transactions they create;

### Functional Requirements

[x] User must be able to create a new transaction;
[x] User must be able to get a account statement;
[x] User must be able to list all existing transactions;
[x] User must be able to list a single transaction;

### Non-functional Requirements
