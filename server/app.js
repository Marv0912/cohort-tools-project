require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

var cohortsRouter = require('./routes/cohorts');
var studentsRouter = require('./routes/students');
var authRouter = require("./routes/auth");
var userRouter = require("./routes/user");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(res => console.log(`Connect to Database: "${res.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use('/api/users', userRouter);
app.use('/api/cohorts', cohortsRouter);
app.use('/api/students', studentsRouter);
app.use('/auth', authRouter);

// app.get("/api/cohorts", (req, res, next) => {
//   return res.status(200).json(Cohorts);
// });

// app.get("/api/cohorts/:cohortId", (req, res, next) => {
//   const { cohortId } = req.params;
//   return res.status(200).json(Cohorts.filter((cohort) => cohort._id === Number(cohortId)));
// });

// app.get("/api/students", (req, res, next) => {
//   return res.status(200).json(Students);
// });


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
