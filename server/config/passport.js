var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJt = require('passport-jwt').ExtractJwt;

    
var User = require('../models/user'); //load up the user model
var settings = require('../config/settings'); // getting settings file

module.exports = function(passport){
    var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
}