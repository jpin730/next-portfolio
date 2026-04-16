import 'server-only'

import { z } from 'zod'

const environmentSchema = z.object({
  // Auth0
  APP_BASE_URL: z.url(),
  AUTH0_CLIENT_ID: z.string().trim().min(1),
  AUTH0_CLIENT_SECRET: z.string().trim().min(1),
  AUTH0_DOMAIN: z.string().trim().min(1),
  AUTH0_SECRET: z.string().trim().min(1),

  // MongoDB
  MONGODB_DB_NAME: z.string().trim().min(1),
  MONGODB_URI: z.string().trim().min(1),

  // Cloudinary
  CLOUDINARY_API_KEY: z.string().trim().min(1),
  CLOUDINARY_API_SECRET: z.string().trim().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().trim().min(1),
  CLOUDINARY_FOLDER: z.string().trim().min(1),
})

type Environment = z.infer<typeof environmentSchema>

let cachedEnvironment: Environment | null = null

const formatIssues = (issues: z.core.$ZodIssue[]): string =>
  issues.map((issue) => `- ${issue.path.join('.')}: ${issue.message}`).join('\n')

export const getEnvironment = (): Environment => {
  if (cachedEnvironment) {
    return cachedEnvironment
  }

  const parsedEnvironment = environmentSchema.safeParse(process.env)

  if (parsedEnvironment.success) {
    cachedEnvironment = parsedEnvironment.data
    return cachedEnvironment
  }

  throw new Error(
    '\nInvalid environment variables:\n' + formatIssues(parsedEnvironment.error.issues),
  )
}
