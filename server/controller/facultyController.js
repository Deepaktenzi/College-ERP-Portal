const express = require('express');
const Faculty = require('../models/faculty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const path = require('path');
module.exports = {
  facultylogin: async (req, res) => {
    try {
      const { registrationNumber, password } = req.body;

      if (!registrationNumber || !password) {
        res.status(204).json({ error: 'Input Missing' });
      } else {
        const faculty = await Faculty.findOne({ registrationNumber });

        const isCorrect = await bcrypt.compare(password, faculty.password);

        if (!isCorrect) {
          res.status(401).json({ error: 'Invalid Credentials' });
        }
        const payload = {
          id: faculty._id,
          role: 'faculty',
          name: faculty.name,
          email: faculty.email,
          avatar: faculty.avatar,
          registrationNumber: faculty.registrationNumber,
          gender: faculty.gender,
          designation: faculty.designation,
          department: faculty.department,
          number: faculty.facultyMobileNumber,
          aadharCard: faculty.aadharCard,
          dob: faculty.dob,
          joiningYear: faculty.joiningYear,
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY);

        res.cookie('JwtAdm', token, {
          expires: new Date(Date.now() + 1260000),
          httpOnly: true,
        });

        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.log('Error in faculty page', error.message);
    }
  },

  getFaculty: async (req, res) => {
    res.send(req.rootUser);
  },

  updateFaculty: async (req, res, next) => {
    const { email, avatar, gender, contactno, aadhar } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (gender) {
      faculty.gender = gender;
      await faculty.save();
    }
    if (contactno) {
      faculty.facultyMobileNumber = contactno;
      await faculty.save();
    }
    if (aadhar) {
      faculty.aadharCard = aadhar;
      await faculty.save();
    }
    faculty.avatar = req.file.filename;
    await faculty.save();
    //console.log(req.file);
    console.log(avatar);
    res.status(200).json({ message: 'updated' });
  },

  logout: async (req, res) => {
    res.clearCookie('JwtAdm', { path: '/' });
    res.status(200).send('Faculty Logout');
  },
};
