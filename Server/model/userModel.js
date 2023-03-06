const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: 8,
    },
    
});

module.exports = User = mongoose.model("User",userSchema);