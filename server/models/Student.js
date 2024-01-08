const { model, Schema, default: mongoose } = require("mongoose");

// Create Schema

const studentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    linkedinUrl: { type: String },
    languages: { type: Array },
    program: { type: String },
    background: { type: String },
    image: { type: String },
    projects: { type: Array },
    cohort: {
        type: mongoose.Types.ObjectId,
        ref: "Cohort"
    }
})

module.exports = model("Student", studentSchema);