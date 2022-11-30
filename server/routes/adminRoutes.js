const express = require('express');
const {
  addLogin,
  addAdmin,
  getAllFaculty,
  addSubject,
  addStudent,
  addFaculty,
  getAllSubject,
  getAllStudents,
  getAdmin,
  adminLogOut,
} = require('../controller/adminController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/getdata', getAdmin);

router.post('/login', addLogin);
router.get('/logout', adminLogOut);
router.post('/addAdmin', addAdmin);

router.post('/addFaculty', addFaculty);
router.get('/getAllFaculty', getAllFaculty);

router.post('/addSubject', addSubject);
router.get('/getAllSubject', getAllSubject);

router.post('/addStudent', addStudent);
router.get('/getAllStudents', getAllStudents);

module.exports = router;
