const mongoose = require('mongoose');
const { Schema } = mongoose;
// const includes = require('lodash/includes');

const userSchema = new Schema({
    name: { type: String, sparse: true, trim: true },
    email: { type: String, index: false, unique: false, sparse: true, trim: true },
    password: { type: String },
    disabled: { type: Boolean, default: false }
}, {
        timestamps: true
    });

// userSchema.methods.isInterviewer = function () {
//     return includes(this.roles, 'interviewer');
// };

// userSchema.methods.isRecruiter = function () {
//     return includes(this.roles, 'recruiter');
// };

// userSchema.methods.interviewees = async function () {
//     if (!this.isInterviewer()) return [];
//     const Interviewee = mongoose.model('Interviewee');
//     return await Interviewee.find({ interviewer: this._id });
// };

module.exports = mongoose.model('User', userSchema);
