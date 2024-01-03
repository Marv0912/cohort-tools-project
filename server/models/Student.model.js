const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const studentSchema = new Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String, // Verify if string or number
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: Number,
    projects: Array
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student