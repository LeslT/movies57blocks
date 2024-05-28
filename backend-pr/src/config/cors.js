export const corsConfig = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL, process.env.APIGATEWAY_URL]
    if (process.argv[2] === '--api') {
      whitelist.push(undefined)
    }
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}
