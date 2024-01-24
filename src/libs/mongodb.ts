import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI has wrong value')

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error)
  }
}

export default connectMongoDB
