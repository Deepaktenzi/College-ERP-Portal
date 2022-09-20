const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  department: {
    type: String,
  },
  dob: {
    type: String,
  },
  joiningYear: {
    type: String,
  },
  avatar: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
});

module.exports = mongoose.model('admin', adminSchema);
