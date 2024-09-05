import { generateToken } from './generator'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { merchantId } = body

    if (!merchantId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    return generateToken('sale', merchantId)
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    })
  }
})