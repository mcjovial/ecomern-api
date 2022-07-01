const app = require('./api/app');
const { connectDB } = require('./api/config/db');

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));
