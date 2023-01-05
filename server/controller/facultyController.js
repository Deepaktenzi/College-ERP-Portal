const express = require('express');
const Faculty = require('../models/faculty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const path = require('path');
const Student = require('../models/student');
const Subject = require('../models/subject');
const Attendance = require('../models/attendance');
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

  allStudents: async (req, res) => {
    const { department, year, section } = req.query;
    const students = await Student.find({ department, year, section });
    const subject = await Subject.find({ department, year });
    // if (students.length === 0) {
    //   res.status(404).json({ error: 'No students Found' });
    // }
    res.status(200).json({ result: students, subjects: subject });
  },

  markAttendance: async (req, res) => {
    try {
      const { checkValue, subjectCode, department, year, section } = req.body;

      const subject = await Subject.findOne({ subjectCode });
      const allStudents = await Student.find({ department, section, year });

      const filterStudents = allStudents.filter((item) => {
        return checkValue.indexOf(item.id) === -1;
      });

      //Students Which Are No Present//
      for (let i = 0; i < filterStudents.length; i++) {
        const pre = await Attendance.findOne({
          student: filterStudents[i]._id,
          subject: subject._id,
        });
        if (!pre) {
          const attendance = new Attendance({
            student: filterStudents[i],
            subject: subject._id,
          });
          attendance.totalLectureByFaculty += 1;
          await attendance.save();
        } else {
          pre.totalLectureByFaculty += 1;
          await pre.save();
        }
      }

      // Students Which Are Present //
      for (let j = 0; j < checkValue.length; j++) {
        const pre = await Attendance.findOne({
          student: checkValue[j],
          subject: subject._id,
        });
        if (!pre) {
          const attendance = new Attendance({
            student: checkValue[j],
            subject: subject._id,
          });
          attendance.totalLectureByFaculty += 1;
          attendance.lectureAttended += 1;
          await attendance.save();
        } else {
          pre.totalLectureByFaculty += 1;
          pre.lectureAttended += 1;
          await pre.save();
        }
      }

      console.log(allStudents[0].id);
      res.status(200).json({ message: 'Attendance Marked' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
  logout: async (req, res) => {
    res.clearCookie('JwtAdm', { path: '/' });
    res.status(200).send('Faculty Logout');
  },
};
