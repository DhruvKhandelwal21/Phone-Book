const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max:10,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      min: 4,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    
});

module.exports = Mydata = mongoose.model("Mydata",dataSchema);