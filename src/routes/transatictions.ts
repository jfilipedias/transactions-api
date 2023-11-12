import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'

export async function transactionsRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body,
		)

		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
		})

		return reply.status(201).send()
	})

	app.get('/', async () => {
		const transactions = await knex('transactions').select('*')

		return { transactions }
	})

	app.get('/:id', async (request) => {
		const getTransactionByIdParamsSchema = z.object({
			id: z.string(),
		})

		const { id } = getTransactionByIdParamsSchema.parse(request.params)

		const transactions = await knex('transactions').where('id', id).first()

		return { transactions }
	})

	app.get('/statement', async () => {
		const statement = await knex('transactions')
			.sum('amount', { as: 'amount' })
			.first()

		return { statement }
	})
}
