const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Faculty = require('../models/faculty');
const Student = require('../models/student');
const Admin = require('../models/admin');
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const faculty = await Student.findById(jwt_payload.id);
      const student = await Faculty.findById(jwt_payload.id);
      const admin = await Admin.findById(jwt_payload.id);
      if (faculty) {
        return done(null, faculty);
      } else if (student) {
        return done(null, student);
      } else if (admin) {
        return done(null, admin);
      } else {
        console.log('Error');
      }
    })
  );
};
