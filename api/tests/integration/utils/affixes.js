const { removeAllCollections, dropAllCollections, disconnectDB, connectDB } = require("../../../config/db");

module.exports = {
  setupDB() {
    // Connect to Mongoose
    beforeAll(async () => {
      await connectDB();
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await disconnectDB()
    });
  },
};