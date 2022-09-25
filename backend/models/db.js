const mongoose = require("mongoose");
const dbUri = 'mongodb://localhost:27017/dummy-project'

// connecting to mongodb
mongoose.connect('mongodb://localhost:27017/E-commerce-project').then(
  () => {
    console.log("ALL SYSTEMS GO");
  },
  (err) => {
    console.log("err");
  }
);
