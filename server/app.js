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
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(res => console.log(`Connect to Database: "${res.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

const Cohorts = require("./models/Cohort");
const Students = require("./models/Student");

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

// Cohorts

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

app.post("/api/cohorts", (req, res, next) => {
  Cohorts.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then((createdCohort) => {
        console.log("Cohort created ->", createdCohort);
        res.status(201).send(createdCohort);
  })
    .catch((error) => {
      console.error("Error while creating cohort ->", error);
      res.status(500).send({ error: "Failed to create cohort" });
  });
});

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohorts.findByIdAndUpdate(cohortId, req.body, { new: true })
      .then((updatedCohort) => {
        console.log("Updated cohort ->", updatedCohort);
        res.status(200).send(updatedCohort);
      })
      .catch((error) => {
        console.error("Error while updating cohort ->", error);
        res.status(500).send({ error: "Failed to update cohort" });
    });
});

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Cohorts.findByIdAndDelete(cohortId)
  .then((result) => {
    console.log("Cohort deleted!");
    res.status(200).json(result);
    })
  .catch((error) => {
    console.error("Error while deleting cohort ->", error);    
      res.status(500).send({error: "Deleting cohort failed"})
  });
});

// Students

app.get("/api/students", (req, res, next) => {
  Students.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved Cohorts ->",students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

app.post("/api/students", (req, res, next) => {
  Students.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects
  })
    .then((createdStudent) => {
        console.log("Cohort created ->", createdStudent);
        res.status(201).send(createdStudent);
  })
    .catch((error) => {
      console.error("Error while creating student ->", error);
      res.status(500).send({ error: "Failed to create student" });
  });
});

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Students.find({cohort: cohortId})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved Student ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
});

app.get("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Students.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved Student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
});

app.put("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Students.findByIdAndUpdate(studentId, req.body, { new: true })
      .then((updatedStudent) => {
        console.log("Updated Student ->", updatedStudent);
        res.status(200).json(updatedStudent);
      })
      .catch((error) => {
        console.error("Error while updating Student ->", error);
        res.status(500).send({ error: "Failed to update Student" });
    });
});

app.delete("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  Students.findByIdAndDelete(studentId)
  .then((result) => {
    console.log("Student deleted!");
    res.status(200).json(result);
    })
  .catch((error) => {
    console.error("Error while deleting Student ->", error);    
      res.status(500).send({error: "Deleting Student failed"})
  });
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
