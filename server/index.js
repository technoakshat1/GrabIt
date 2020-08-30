//this is an RESTFULL API implementation of backend specifically
//to serve the mobile app and website with data.

//express,passport,mongoose,mongoDB,are used to serve up
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
var cors = require("cors");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/GrabIt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
});
mongoose.set("useCreateIndex", true);

app.listen(process.env.PORT || 3001, () => {
  console.log("server started on port 3001");
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  preferedMode: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

const featuresSchema = mongoose.Schema({
  featuredCat: String,
  featuredType: String,
  featuredItemId: String,
  featuredItemMedia: {
    img: Array,
    vid: Array,
  },
});

passport.use(User.createStrategy());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URI,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const Featured = mongoose.model("featured", featuresSchema);

// backend for home route for get

app.get("/", (req, res) => {
  Featured.find({}, function (err, result) {
    if (!err) {
      res.json(result);
    } else {
      res.code(500);
      console.log(err);
    }

    // const Feature=new Featured({
    //   featuredCat:"Food",
    //   featuredType:"Special",
    //   featuredItemId:"23456666",
    //   featuredItemMedia:{
    //    img:[],
    //    vid:[],
    //  },
    // });

    // Feature.save();
  });
});

app.get(
  "/signIn/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/signIn/google/redirect",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  }
);

app
  .route("/signIn")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      User.findOne({ username: req.user.username }, function (err, user) {
        if (!err) {
          res.json({
            username: user.username,
            mode: user.preferedMode,
            message: "Authenticated",
          });
        }
      });
    } else {
      res.json({ message: "UnAuthenticated" });
    }
  })
  .post(function (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, function (err) {
      if (!err) {
        passport.authenticate("local")(req, res, function () {
          User.findOne({ username: req.user.username }, function (err, user) {
            if (!err) {
              res.json({
                username: user.username,
                mode: user.preferedMode,
                message: "success",
              });
            }
          });
        });
      } else {
        res.json({ message: "fail" });
        console.log(err);
      }
    });
  });

app.post("/signUp", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (!err) {
      passport.authenticate("local")(req, res, function () {
        res.json({ message: "success" });
      });
    } else {
      console.log(err.message);
      res.json({ message: err.message });
    }
  });
});

app.get("/signOut", function (req, res) {
  req.logout();
  res.json({ message: "success" });
});

app
  .route("/userInfo")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      User.findOne({ username: req.user.username }, function (err, user) {
        if (!err) {
          res.json({
            username: user.username,
            mode: user.preferedMode,
            message: "success",
          });
        }
      });
    } else {
      res.json({ message: "userIsUnauthenticated" });
    }
  })

  .post(function (req, res) {
    if (req.isAuthenticated()) {
      User.findOneAndUpdate(
        { username: req.user.username },
        { preferedMode: req.body.mode },
        function (err) {
          if (!err) {
            res.json({ message: "success" });
          } else {
            res.json({ message: "failure" });
            console.log(err);
          }
        }
      );
    }
  });
