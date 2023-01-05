const express = require('express');
const {
  facultylogin,
  getFaculty,
  logout,
  updateFaculty,
  allStudents,
  markAttendance,
} = require('../controller/facultyController');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'FAC' + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', facultylogin);
router.post('/updateFaculty', upload.single('avatar'), updateFaculty);
router.get('/getdata', auth, getFaculty);
router.get('/allStudents', allStudents);
router.post('/markAttendance', markAttendance);

router.get('/logout', logout);

module.exports = router;
