const app = require('./backend/app');
const { connectDB } = require('./backend/config/db');
const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));
