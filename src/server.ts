import fastify from 'fastify'
import { env } from './env'

const app = fastify()

app.get('/', () => {})

app
	.listen({
		port: env.PORT,
	})
	.then(() =>
		console.log(`HTTP Server Running on http://localhost:${env.PORT}`),
	)
