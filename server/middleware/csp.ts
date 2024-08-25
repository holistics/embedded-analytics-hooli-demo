// server/middleware/csp.ts
export default defineEventHandler((event) => {
  if (process.env.NODE_ENV === 'development') {
    setResponseHeader(event, 'Content-Security-Policy', "frame-src 'self' https://demo4.holistics.io")
  }
})