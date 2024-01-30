const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        required: true
    },
    phoneNumber: { type: String },
    address: { type: String },
    createdAt: {
        type: Date,
        default: Date.now // Setting a default value to the current date and time
    }
})
const Users = mongoose.model("User", userSchema)
module.exports = Users;
