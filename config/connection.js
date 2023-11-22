require('dotenv').config(
    {path: '../.env'}
)
const mongoose = require("mongoose");


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
  {
    // recommended good practice for compatibility with new versions of mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


module.exports = mongoose.connection;