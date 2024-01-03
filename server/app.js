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

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/cohort-tools-api")
  .then(res => console.log(`Connect to Database: "${res.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

const Cohorts = require("./models/Cohort.model");
const Students = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

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

app.get("/api/cohorts", (req, res, next) => {
  Cohorts.find({})
    .then((cohorts) => {
      console.log("Retrieved Cohorts ->",cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohorts.findById(cohortId)
    .then((cohort) => {
      console.log("Retrieved Cohort ->",cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

app.get("/api/students", (req, res, next) => {
  Students.find({})
    .then((students) => {
      console.log("Retrieved Cohorts ->",students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
