import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'
import { checkExistingSessionId } from '@/middlewares/check-existing-session-id'

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

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()
			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
			})
		}

		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		})

		return reply.status(201).send()
	})

	app.get(
		'/',
		{
			preHandler: [checkExistingSessionId],
		},
		async (request) => {
			const { sessionId } = request.cookies

			const transactions = await knex('transactions')
				.where('session_id', sessionId)
				.select('*')

			return { transactions }
		},
	)

	app.get(
		'/:id',
		{
			preHandler: [checkExistingSessionId],
		},
		async (request) => {
			const getTransactionByIdParamsSchema = z.object({
				id: z.string(),
			})

			const { id } = getTransactionByIdParamsSchema.parse(request.params)

			const { sessionId } = request.cookies

			const transactions = await knex('transactions')
				.where({ id, session_id: sessionId })
				.first()

			return { transactions }
		},
	)

	app.get(
		'/statement',
		{
			preHandler: [checkExistingSessionId],
		},
		async (request) => {
			const { sessionId } = request.cookies

			const statement = await knex('transactions')
				.where('session_id', sessionId)
				.sum('amount', { as: 'amount' })
				.first()

			return { statement }
		},
	)
}
