import { afterAll, beforeAll, describe, it } from 'vitest'
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
})
