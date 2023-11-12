import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
	config({ path: '.env.test' })
} else {
	config()
}

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	DATABASE_URL: z.string(),
	PORT: z.string().default('3333').transform(Number),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
	console.error('Invalid environment variables.', result.error.issues)
	throw new Error('Invalid environment variables.')
}

export const env = result.data
