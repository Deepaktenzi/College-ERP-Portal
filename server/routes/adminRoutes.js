const express = require('express');
const {
  addLogin,
  addAdmin,
  getAllFaculty,
} = require('../controller/adminController');
const passport = require('passport');

const router = express.Router();

router.post('/login', addLogin);
router.post('/addAdmin', addAdmin);
router.get(
  '/getAllFaculty',
  passport.authenticate('jwt', { session: false }),
  getAllFaculty
);

module.exports = router;
