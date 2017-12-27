const express = require("express");
const passport = require("passport");
const keys = require("./config/keys");

const GoogleStrategy = require("passport-google-oauth20");
const app = express();

// Use the GoogleStrategy in passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.get("/", (req, res) => {
  res.send({ name: "cee!" });
});

const port = process.env.PORT || 5000;
app.listen(port);
