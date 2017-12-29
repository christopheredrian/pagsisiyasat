const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const mongoose = require("mongoose");
const User = mongoose.model("users");

const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Use the GoogleStrategy in passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log(`Already have a record [${profile.id}]`);

          done(null, existingUser);
        } else {
          console.log(`New User [${profile.id}]`);

          new User({
            googleId: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
