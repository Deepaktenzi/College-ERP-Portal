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
} = require('../controller/adminController');
const passport = require('passport');

const router = express.Router();

router.post('/login', addLogin);
router.post('/addAdmin', addAdmin);

router.post('/addFaculty', addFaculty);
router.get('/getAllFaculty', getAllFaculty);

router.post('/addSubject', addSubject);
router.get('/getAllSubject', getAllSubject);

router.post('/addStudent', addStudent);
router.get('/getAllStudents', getAllStudents);

module.exports = router;
