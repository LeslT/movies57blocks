import 'dotenv/config'
import serverless from 'serverless-http'
import app from './index.js'
import Db from './db/db.js'

async function getConnection () {
  await Db.getConnection()
}

const handler = serverless(app)
module.exports.handler = async (event, context) => {
  await getConnection()
  const result = await handler(event, context)
  return result
}
