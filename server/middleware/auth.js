const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Faculty = require('../models/faculty');
const Student = require('../models/student');
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JwtAdm;

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (verifyToken.role === 'admin') {
      var rootUser = await Admin.findOne({ _id: verifyToken.id });
    } else if (verifyToken.role === 'faculty') {
      var rootUser = await Faculty.findOne({ _id: verifyToken.id });
    } else if (verifyToken.role === 'Student') {
      var rootUser = await Student.findOne({ _id: verifyToken.id });
    }

    if (!rootUser) {
      throw new Error('User Not Found');
    }

    req.rootUser = rootUser;

    next();
  } catch (error) {
    res.status(401).send('Unauthorized User : invalid Token');
    console.log(error);
  }
};

module.exports = auth;
