const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const app = express();
app.use(express.json());
dotenv.config({ path: './config/config.env' });
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
// Mongoose Connect//
mongoose
  .connect(
    'mongodb+srv://admin:admin123@cluster0.dnfbzif.mongodb.net/college_erp?retryWrites=true&w=majority'
  )
  .then(() => console.log('SERVER IS RUNNING...'))
  .catch((err) => {
    console.log(err);
  });

app.listen(4000);
