const mongoose = require("mongoose");

// connecting to mongodb
mongoose.connect('mongodb://localhost:27017/E-commerce-project').then(
  () => {
    console.log("ALL SYSTEMS GO");
  },
  (err) => {
    console.log(err);
  }
);
