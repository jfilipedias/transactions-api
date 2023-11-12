import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { app } from '@/app'

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready()
	})

	beforeEach(() => {
		execSync('npm run knex migrate:rollback --all')
		execSync('npm run knex migrate:latest')
	})

	afterAll(async () => {
		app.close()
	})

	it('should be able to create a new transaction.', async () => {
		await supertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 150,
				type: 'credit',
			})
			.expect(201)
	})

	it('should be able to list all transactions.', async () => {
		const createTransactionResponse = await supertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 150,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie')

		const listTransactionsResponse = await supertest(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200)

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'New transaction',
				amount: 150,
			}),
		])
	})

	it('should be able to get a specific transaction.', async () => {
		const createTransactionResponse = await supertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 150,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie')

		const listTransactionsResponse = await supertest(app.server)
			.get('/transactions')
			.set('Cookie', cookies)

		const transactionId = listTransactionsResponse.body.transactions[0].id

		const listTransactionByIdResponse = await supertest(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies)
			.expect(200)

		expect(listTransactionByIdResponse.body.transactions).toEqual(
			expect.objectContaining({
				title: 'New transaction',
				amount: 150,
			}),
		)
	})

	it('should be able to get the transactions statement.', async () => {
		const createTransactionResponse = await supertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 150,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie')

		await supertest(app.server)
			.post('/transactions')
			.set('Cookie', cookies)
			.send({
				title: 'New transaction',
				amount: 50,
				type: 'debit',
			})

		const transactionsStatementResponse = await supertest(app.server)
			.get('/transactions/statement')
			.set('Cookie', cookies)
			.expect(200)

		expect(transactionsStatementResponse.body.statement).toEqual({
			amount: 100,
		})
	})
})
