import 'dotenv/config'
import app from './index.js'
import Db from './db/db.js'

const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    await Db.getConnection()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
  }
}

startServer()
