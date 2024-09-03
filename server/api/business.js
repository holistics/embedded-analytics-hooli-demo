import { generateToken } from './generator'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { user } = body

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    return generateToken('business', user)
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    })
  }
})