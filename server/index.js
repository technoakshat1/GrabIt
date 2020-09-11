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
const TwitterStrategy=require("passport-twitter").Strategy;
const FacebookStrategy=require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const findOrCreate = require("mongoose-findorcreate");
var cors = require("cors");

const mailgun=require("mailgun-js")({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
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
  facebookId:String,
  twitterId:String,
  preferedMode: String,
  profileImage:String,
  active:Boolean,
  oAuthActivityCount:Number,
  firstName:String,
  surname:String,
  address:String,
  postalCode:String,
  state:String,
  city:String,
  country:String,
});



userSchema.plugin(passportLocalMongoose,{
  usernameUnique: false,
 
  findByUsername: function(model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

const productSchema=new mongoose.Schema({
  prodName:String,
  media:{
    img:Array,
    vid:Array,
  },
  prodDetails:String,
  prodCategory:String,
  prodPrice:String,
  prodCurrency:String,
  prodType:String,
  stockId:String,
  createdBy:String,
});

const storeSchema=new mongoose.Schema({
  storeName:String,
  storeOwnerId:String,
  allowedSalesmanIds:Array,
  allowedAdminIds:Array,
  media:{
    img:Array,
    vid:Array,
  },
  storeCategory:String,
  storeReviewId:String,
  storeContactDetails:{
    phoneNumber:Number,
    primaryEmail:String,
    secondaryEmail:String,
    address:String,
  },
  storeSize:String,
  peopleCount:Number
});

const stockSchema=new mongoose.Schema({
 storeId:String,
 productId:String,
 stockCount:Number,
});

const Product=new mongoose.model("Product",productSchema);
const Store=new mongoose.model("Store",storeSchema);
const Stock=new mongoose.model("Stock",stockSchema);

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
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName,profileImage:profile.photos[0].value },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_URI,
},
function(token, tokenSecret, profile, cb) {
  console.log(profile);
  User.findOrCreate({ username:profile.displayName,twitterId: profile.id,profileImage:profile.photos[0].value }, function (err, user) {
    return cb(err, user);
  });
}
));
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_URI,
},
function(accessToken, refreshToken, profile, cb) {
  // console.log(profile);
  User.findOrCreate({ username:profile.displayName,facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// backend for home route for get

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

app.get('/signIn/facebook',
  passport.authenticate('facebook'));

app.get('/signIn/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });
  
app.get('/signIn/twitter',
  passport.authenticate('twitter'));

app.get('/signIn/twitter/redirect', 
  passport.authenticate('twitter', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

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
  User.register({ username: req.body.username,email: req.body.email,active:false}, req.body.password, function (
    err,
    user
  ) {
    if (!err) {
      // passport.authenticate("local")(req, res, function () {
      //   res.json({ message: "success" });
      // });
      jwt.sign({username: user.username},process.env.EMAIL_VERIFICATION_SECRET,{expiresIn:'30m'},(err,token)=>{
        const data={
          from: 'GrabIt! <grabit@accountverificationgrabit.email>',
          to: `${user.email}`,
          subject: 'Account-verification',
          html: `<html><form><a href=http://localhost:3001/signUp/account-verification/${token}>Click Me</a></form></html>`
        }
        mailgun.messages().send(data, (error, body) => {
          if(!error){
            res.json({ message:"success",});
          }else{
            res.json({ message:"checkEmail"});
          }
          console.log(body);
        });
        
        // res.json({ message:'success'});
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
            email:user.email,
            profileImg:user.profileImage,
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

  app.get("/signUp/account-verification/:token",function(req,res){
    jwt.verify(req.params.token,process.env.EMAIL_VERIFICATION_SECRET,(err,decoded)=>{
      // console.log(decoded);
      if(!err){
        User.findOne({username:decoded.username},function (err, user){
          if(!err){
            //console.log(user);
            if(user){
              res.redirect(`http://localhost:3000/account-verification?username=${user.username}&email=${user.email}`);
            }else{
              res.status(404).send("User not found");
            }
            
          }else{
            res.sendStatus(403);
          }
        });
      }else{
        res.sendStatus(403);
      }
       
    })
  });

  app.post("/signUp/account-verification",function(req,res){
    const recivedData={
      firstName:req.body.firstName,
      surname:req.body.surname,
      email:req.body.email,
      address:req.body.address,
      postalCode:req.body.postalCode,
      city:req.body.city,
      state:req.body.state,
      country:req.body.country,
      active:true,
    }
     User.findOneAndUpdate({username:req.body.username},recivedData,function(err,user){
       if(!err){
         res.json({message:"success"});
       }else{
         res.sendStatus(500);
       }
     });
  });

  app.get("/signUp/isPendingForVerification/:username",function(req,res){
    User.findOne({username:req.params.username},function(err,user){
        if(!err){
          if(user&&!user.active){
            res.json({message:"success"});
          }else{
            res.sendStatus(403);
          }
        }else{
          res.sendStatus(500);
        }
    });
  });
  

  
