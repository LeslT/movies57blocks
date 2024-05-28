import mongoose from 'mongoose'

class Db {
  constructor () {
    console.log('************* SE CREA INSTANCIA DE Db singleton *************')
  }

  async connect () {
    const uri = `${process.env.MONGO_URI}`
    try {
      await mongoose.connect(uri, { maxPoolSize: 200 })
      console.log('Conexión exitosa a la BD')
    } catch (error) {
      console.error('Error al conectar a la BD:', error)
      throw error
    }
  }

  getConnection () {
    return this.connect()
  }
}

const dbInstance = new Db()
export default dbInstance
