import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { app } from '@/app'

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready()
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
})
