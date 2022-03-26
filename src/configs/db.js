const mongoose = require("mongoose");

module.exports = ()=>{
   return mongoose.connect(
  "mongodb+srv://sheelu:sheelu_123@cluster0.wudm6.mongodb.net/fileUp?authSource=admin&replicaSet=atlas-12jprm-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
);
}
