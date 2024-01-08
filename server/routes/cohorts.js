var express = require('express');
var router = express.Router();

const Cohorts = require("../models/Cohort");
const Students = require("../models/Student");

router.get("/", (req, res, next) => {
    Cohorts.find({})
      .then((cohorts) => {
        console.log("Retrieved Cohorts ->",cohorts);
        res.json(cohorts);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});
  
router.get("/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Cohorts.findById(cohortId)
      .then((cohort) => {
        console.log("Retrieved Cohort ->",cohort);
        res.json(cohort);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});
  
router.post("/", (req, res, next) => {
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
        next(error);
        res.status(500).send({ error: "Failed to create cohort" });
    });
});
  
router.put("/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Cohorts.findByIdAndUpdate(cohortId, req.body, { new: true })
        .then((updatedCohort) => {
          console.log("Updated cohort ->", updatedCohort);
          res.status(200).send(updatedCohort);
        })
        .catch((error) => {
          console.error("Error while updating cohort ->", error);
          next(error);
          res.status(500).send({ error: "Failed to update cohort" });
    });
});
  
router.delete("/:cohortId", (req, res, next) => {
    const { cohortId } = req.params;
    Cohorts.findByIdAndDelete(cohortId)
    .then((result) => {
      console.log("Cohort deleted!");
      res.status(200).json(result);
      })
    .catch((error) => {
      console.error("Error while deleting cohort ->", error);
      next(error);
      res.status(500).send({error: "Deleting cohort failed"})
    });
});

module.exports = router;