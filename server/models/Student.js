const { model, Schema, default: mongoose } = require("mongoose");

// Create Schema

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    projects: Array,
    cohort: {
        type: mongoose.Types.ObjectId,
        ref: "Cohort"
    }
})

module.exports = model("Student", studentSchema);