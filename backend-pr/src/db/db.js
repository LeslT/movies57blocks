import mongoose from 'mongoose'

class Db {
  constructor () {
    console.log('************* SE CREA INSTANCIA DE Db singleton *************')
    this._connect()
  }

  async _connect () {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log('Connected to MongoDB')
      return conn
    } catch (err) {
      console.error('Error connecting to MongoDB', err)
      throw err
    }
  }

  getConnection () {
    return mongoose.connection
  }
}

const dbInstance = new Db()
export default dbInstance
