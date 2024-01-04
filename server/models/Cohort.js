// Cohorts Model
const { model, Schema } = require("mongoose");

//Schema - structure of document
const cohortSchema = new Schema({
        inProgress: Boolean,
        cohortSlug: String,
        cohortName: String,
        program: String,
        campus: String,
        startDate: Date,
        endDate: Date,
        programManager: String,
        leadTeacher: String,
        totalHours: Number
})

module.exports = model("Cohort", cohortSchema);