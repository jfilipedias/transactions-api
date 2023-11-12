import fastify from 'fastify'
import { env } from '@/env'
import { transactionsRoutes } from '@/routes/transatictions'

const app = fastify()

app.register(transactionsRoutes, {
	prefix: '/transactions',
})

app
	.listen({
		port: env.PORT,
	})
	.then(() =>
		console.log(`HTTP Server Running on http://localhost:${env.PORT}`),
	)
