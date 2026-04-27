import 'server-only'

import mongoose from 'mongoose'

import { getEnvironment } from '@/core/lib/env'

declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined
}

export const connectDB = async (): Promise<typeof mongoose> => {
  if (global.mongooseConnection) {
    return global.mongooseConnection
  }

  const environment = getEnvironment()

  global.mongooseConnection = mongoose.connect(environment.MONGODB_URI, {
    dbName: environment.MONGODB_DB_NAME,
  })

  return global.mongooseConnection
}
