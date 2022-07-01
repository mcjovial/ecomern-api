const mongoose = require('mongoose')

mongoose.promise = global.Promise;

// For test
exports.removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

exports.dropAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

let dbUri = process.env.MONGO_URI

if (process.env.NODE_ENV === 'test') {
  dbUri = process.env.TEST_MONGO_URI
}

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUri)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

exports.disconnectDB = async () => {
  mongoose.disconnect();
}

// module.exports = connectDB
