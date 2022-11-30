const express = require('express');
const {
  facultylogin,
  getFaculty,
  logout,
} = require('../controller/facultyController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', facultylogin);
router.get('/getdata', auth, getFaculty);
router.get('/logout', logout);

module.exports = router;
