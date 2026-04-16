import 'server-only'

import mongoose from 'mongoose'

import { getEnvironment } from '@/core/lib/env'

declare global {
  var __mongooseConnection__: Promise<typeof mongoose> | undefined
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (global.__mongooseConnection__) {
    return global.__mongooseConnection__
  }

  const environment = getEnvironment()

  global.__mongooseConnection__ = mongoose.connect(environment.MONGODB_URI, {
    dbName: environment.MONGODB_DB_NAME,
  })

  return global.__mongooseConnection__
}
