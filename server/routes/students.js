var express = require('express');
var router = express.Router();

const Cohorts = require("../models/Cohort");
const Students = require("../models/Student");

router.get("/", (req, res, next) => {
    Students.find({})
      .populate("cohort")
      .then((students) => {
        console.log("Retrieved Cohorts ->",students);
        res.json(students);
      })
      .catch((error) => {
        console.error("Error while retrieving students ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve students" });
      });
});
  
router.post("/", (req, res, next) => {
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
        next(error);
        res.status(500).send({ error: "Failed to create student" });
    });
});
  
router.get("/cohort/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Students.find({cohort: cohortId})
      .populate("cohort")
      .then((students) => {
        console.log("Retrieved Student ->", students);
        res.json(students);
      })
      .catch((error) => {
        console.error("Error while retrieving student ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve student" });
      });
});
  
router.get("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    Students.findById(studentId)
      .populate("cohort")
      .then((student) => {
        console.log("Retrieved Student ->", student);
        res.json(student);
      })
      .catch((error) => {
        console.error("Error while retrieving student ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve student" });
      });
});
  
router.put("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    Students.findByIdAndUpdate(studentId, req.body, { new: true })
        .then((updatedStudent) => {
          console.log("Updated Student ->", updatedStudent);
          res.status(200).json(updatedStudent);
        })
        .catch((error) => {
          console.error("Error while updating Student ->", error);
          next(error);
          res.status(500).send({ error: "Failed to update Student" });
      });
});
  
router.delete("/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    Students.findByIdAndDelete(studentId)
    .then((result) => {
      console.log("Student deleted!");
      res.status(200).json(result);
      })
    .catch((error) => {
      console.error("Error while deleting Student ->", error);
      next(error);
      res.status(500).send({error: "Deleting Student failed"})
    });
});

module.exports = router;