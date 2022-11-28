const express = require('express');
const { facultylogin } = require('../controller/facultyController');

const router = express.Router();

router.post('/login', facultylogin);

module.exports = router;
