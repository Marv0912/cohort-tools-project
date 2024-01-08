// Cohorts Model
const { model, Schema } = require("mongoose");

//Schema - structure of document
const cohortSchema = new Schema({
        inProgress: { type: Boolean },
        cohortSlug: { type: String},
        cohortName: { type: String },
        program: { type: String },
        campus: { type: String },
        startDate: Date,
        endDate: Date,
        programManager: { type: String },
        leadTeacher: { type: String },
        totalHours: { type: Number }
})

module.exports = model("Cohort", cohortSchema);