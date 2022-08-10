import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV === 'development') {
  try {
    require('./refresh.ignored')
  } catch {
    // ignore
  }
}

export { handleRequest as default } from '@myorg/common-remix.server'
