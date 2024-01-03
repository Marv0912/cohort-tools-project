// Cohorts Model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema - structure of document
const cohortSchema = new Schema({
        _id: Number,
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

// Create Model
const Cohort = mongoose.model("Cohort", cohortSchema);

// Export the Model
module.exports = Cohort;