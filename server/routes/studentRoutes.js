const express = require('express');
const {
  studentLogin,
  getStudent,
  checkAttendance,
} = require('../controller/studentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', studentLogin);
router.get('/getStudent', auth, getStudent);
router.get('/checkAttendance', checkAttendance);

module.exports = router;
