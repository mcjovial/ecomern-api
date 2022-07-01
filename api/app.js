// const path = require('path');
const express = require('express');
const { errorHandler } = require('./middlewares/error.middleware');
const cors = require("cors");
// const { readdirSync } = require("fs");

require('colors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes middlewares
// app.use('/api/goals', require('./routes/goal.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/admin.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/cloudinary.routes'));
app.use('/api', require('./routes/coupon.routes'));
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/sub.routes'));
app.use('/api', require('./routes/user.routes'));

// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler);

module.exports = app;
