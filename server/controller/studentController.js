const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Attendance = require('../models/attendance');
module.exports = {
  studentLogin: async (req, res) => {
    try {
      const { registrationNumber, password } = req.body;

      if (!registrationNumber || !password) {
        res.status(404).json({ error: 'Invalid Credentials' });
      }
      const student = await Student.findOne({ registrationNumber });

      const isCorrect = await bcrypt.compare(password, student.password);

      if (!isCorrect) {
        res.status(401).json({ error: 'Student Id 0r Password is wrong' });
      } else {
        const payload = {
          id: student._id,
          role: 'Student',
          name: student.name,
          email: student.email,
          avatar: student.avatar,
          registrationNumber: student.registrationNumber,
          gender: student.gender,
          department: student.department,
          number: student.facultyMobileNumber,
          aadharCard: student.aadharCard,
          dob: student.dob,
          section: student.section,
          batch: student.batch,
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY);

        res.cookie('JwtAdm', token, {
          expires: new Date(Date.now() + 1260000),
          httpOnly: true,
        });

        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.log('Error of Student Login' + error);
    }
  },
  getStudent: async (req, res) => {
    res.send(req.rootUser);
  },
  checkAttendance: async (req, res) => {
    const { student, year, section } = req.query;

    const attendance = await Attendance.find({
      student,
    }).populate('subject');

    if (!attendance) {
      res.status(400).json({ message: 'Attendance not found' });
    }
    res.status(200).json({
      result: attendance.map((att) => {
        let res = {};
        res.attendence = (
          (att.lectureAttended / att.totalLectureByFaculty) *
          100
        ).toFixed(2);
        res.subjectCode = att.subject.subjectCode;
        res.subjectName = att.subject.subjectName;
        res.maxHours = att.subject.totalLectures;
        res.absentHours = att.totalLectureByFaculty - att.lectureAttended;
        res.lectureAttended = att.lectureAttended;
        res.totalLectureByFaculty = att.totalLectureByFaculty;
        return res;
      }),
    });
  },
};
