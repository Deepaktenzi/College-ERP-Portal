const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const app = express();
app.use(express.json());
dotenv.config({ path: './config/config.env' });

app.use(cors());

// MiddleWare //
app.use(passport.initialize());

require('./config/passport')(passport);
// Routes //
app.use('/api/admin', adminRoutes);

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
