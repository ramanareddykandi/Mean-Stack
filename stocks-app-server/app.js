// Add module dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session  = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;

const userModel = require('./model/user.registration.model');

const PORT = process.env.PORT || 9898;

// App Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', require('./routes/stocks.router'));

//mongo connection
const dbConnection = require('./helpers/mongo_connection.helper');

dbConnection.mongodbConnection();

// app.use(session({secret : "SECRET_KEY", resave : true, saveUninitialized : true}));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, cb) {
// 	cb(null, user);
//   });
  
//   passport.deserializeUser(function(user, cb) {
// 	  userModel.find({ userName: user.username }, function (err, user) {
// 		  console.log("Login INfo::", user);
// 	  cb(err, user);
// 	});
//   });

//   passport.use(new LocalStrategy((username, password, done)=>{
// 	userModel.find({ userName: user.username }, function (err, USER) {
// 		console.log("Login INfo::", user);
// 		 if(username === USER.username && password === USER.password){
// 			done (null, {username, password});
// 		}else{
// 			done (null, false);
// 		}
//   });
	  
//}))

// Run the microservice app
app.listen(PORT, () => {

	console.log(`Server is running on  Port`,PORT);
});