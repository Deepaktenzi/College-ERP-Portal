const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { timing } = require('npmlog');

module.exports = {
  addAdmin: async (req, res) => {
    const { name, email, password, dob, department } = req.body;

    if (!name || !email || !dob || !password || !department) {
      res.status(400).json({ message: 'Fields Are Empty' });
    } else {
      const adminExist = await Admin.findOne({ email: email });
      if (adminExist) {
        res.status(400).json({ message: 'Email Already Exixt' });
      } else {
        var date = new Date();
        const joiningYear = date.getFullYear();

        let departmentHelper;
        if (department === 'C.S.E') {
          departmentHelper = '01';
        } else if (department === 'E.C.E') {
          departmentHelper = '02';
        } else if (department === 'I.T') {
          departmentHelper = '03';
        } else if (department === 'Mechanical') {
          departmentHelper = '04';
        } else if (department === 'Civil') {
          departmentHelper = '05';
        } else if (department === 'E.E.E') {
          departmentHelper = '06';
        } else {
          departmentHelper = '00';
        }
        const admins = await Admin.find({ department });
        let helper;
        if (admins.length < 10) {
          helper = '00' + admins.length.toString();
        } else if (students.length < 100 && students.length > 9) {
          helper = '0' + admins.length.toString();
        } else {
          helper = admins.length.toString();
        }
        let hashpass = await bcrypt.hash(dob, 10);

        var components = ['ADM', date.getFullYear(), departmentHelper, helper];
        var registrationNumber = components.join('');
        const newAdmin = new Admin({
          name,
          email,
          password: hashpass,
          registrationNumber,
          joiningYear,
          department,
        });
        await newAdmin.save();
        res
          .status(200)
          .json({ message: 'New Admin Added', response: newAdmin });
      }
    }
  },
  addLogin: async (req, res) => {
    try {
      const { registrationNumber, password } = req.body;

      const admin = await Admin.findOne({ registrationNumber });

      const isCorrect = await bcrypt.compare(password, admin.password);

      if (!isCorrect) {
        res.status(404).json({ error: 'Invalid Credentials' });
      }
      const payload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        contactNumber: admin.contactNumber,
        avatar: admin.avatar,
        registrationNumber: admin.registrationNumber,
        joiningYear: admin.joiningYear,
        department: admin.department,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 7200 },
        (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        }
      );
    } catch (err) {
      console.log('Error in admin login', err.message);
    }
  },
  getAllFaculty: async (req, res) => {
    console.log('This is getAllFaculty Page');
  },
};
