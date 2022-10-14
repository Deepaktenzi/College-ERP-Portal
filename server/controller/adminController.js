const Admin = require('../models/admin');
const Student = require('../models/student');
const Subject = require('../models/subject');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Faculty = require('../models/faculty');

module.exports = {
  // Add New Admin //
  addAdmin: async (req, res) => {
    const { name, email, dob, department } = req.body;

    if (!name || !email || !dob || !department) {
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
  // Admin Login
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

  addFaculty: async (req, res) => {
    try {
      const {
        name,
        email,
        designation,
        department,
        facultyMobileNumber,
        aadharCard,
        dob,
        gender,
      } = req.body;

      const isFaculty = await Faculty.findOne({ email });

      if (isFaculty) {
        res.status(400).json({ message: 'Faculty Already Exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm', // Default
        });
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
        } else {
          departmentHelper = '06';
        }

        const faculties = await Faculty.find({ department });
        let helper;
        if (faculties.length < 10) {
          helper = '00' + faculties.length.toString();
        } else if (faculties.length < 100 && faculties.length > 9) {
          helper = '0' + faculties.length.toString();
        } else {
          helper = faculties.length.toString();
        }
        let date = new Date();
        const components = [
          'FAC',
          date.getFullYear(),
          departmentHelper,
          helper,
        ];

        var registrationNumber = components.join('');

        const joiningYear = date.getFullYear();

        let hassPass = await bcrypt.hash(dob, 10);

        const newFaculty = await new Faculty({
          name,
          email,
          designation,
          password: hassPass,
          department,
          facultyMobileNumber,
          gender,
          avatar,
          aadharCard,
          registrationNumber,
          dob,
          joiningYear,
        });
        await newFaculty.save();
        res.status(200).json({ result: newFaculty });
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  getAllFaculty: async (req, res) => {
    try {
      const { department } = req.body;
      const allFaculty = await Faculty.find({ department });
      if (allFaculty.length === 0) {
        res.status(404).json({ message: 'Faculties Not Found' });
      } else {
        res.status(200).json({ result: allFaculty });
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  // Adding Students //
  addStudent: async (req, res) => {
    try {
      const {
        name,
        email,
        year,
        fatherName,
        aadharCard,
        gender,
        department,
        section,
        dob,
        studentMobileNumber,
        fatherMobileNumber,
      } = req.body;
      const adminExist = await Admin.findOne({ email });
      if (adminExist) {
        res.status(400).json({ err: 'Email Already Exixt' });
      } else {
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
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
        const students = await Student.find({ department });
        let helper;
        if (students.length < 10) {
          helper = '00' + students.length.toString();
        } else if (students.length < 100 && students.length > 9) {
          helper = '0' + students.length.toString();
        } else {
          helper = students.length.toString();
        }
        let hashpass = await bcrypt.hash(dob, 10);
        var date = new Date();
        const batch = date.getFullYear();
        var components = ['STU', date.getFullYear(), departmentHelper, helper];
        var registrationNumber = components.join('');
        const newStudent = new Student({
          name,
          email,
          password: hashpass,
          year,
          fatherName,
          aadharCard,
          gender,
          registrationNumber,
          department,
          section,
          batch,
          avatar,
          dob,
          studentMobileNumber,
          fatherMobileNumber,
        });
        await newStudent.save();

        const subjects = await Subject.find({ year });

        if (subjects.length !== 0) {
          for (var i = 0; i < subjects.length; i++) {
            newStudent.subjects.push(subjects[i]._id);
          }
        }
        await newStudent.save();

        res.status(200).json({ result: newStudent });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: 'error in adding new student', err: err.message });
    }
  },

  // Show Students //
  getAllStudents: async (req, res) => {
    try {
      const { department, year } = req.body;
      const allStudents = await Student.find({ department, year });
      res.status(200).json({ result: allStudents });
    } catch (err) {
      res
        .status(400)
        .json({ message: 'Error In Showing Students', err: err.message });
    }
  },

  // Add Subjects //
  addSubject: async (req, res) => {
    try {
      const { totalLectures, department, subjectCode, subjectName, year } =
        req.body;
      const subject = await Subject.findOne({ subjectCode });
      if (subject) {
        return res
          .status(400)
          .json({ error: 'Given Subject is already added' });
      }
      const newSubject = await new Subject({
        totalLectures,
        department,
        subjectCode,
        subjectName,
        year,
      });
      await newSubject.save();
      const students = await Student.find({ department, year });
      if (students.length === 0) {
        return res
          .status(400)
          .json({ error: 'No branch found for given subject' });
      } else {
        for (var i = 0; i < students.length; i++) {
          students[i].subjects.push(newSubject._id);
          await students[i].save();
        }
        res.status(200).json({ newSubject });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  // Show Subjects //
  getAllSubject: async (req, res) => {
    try {
      const { department, year } = req.body;
      const allSubjects = await Subject.find({ department, year });
      res.status(200).json({ result: allSubjects });
    } catch (err) {
      console.log('Error in gettting all students', err.message);
    }
  },
};
