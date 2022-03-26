const express = require("express");
//const path = require("path");
const User = require("../models/user.model");

const {single,multiple} = require("../middle/uplode");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    //console.table({name:"sheelu",age:22});
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//array,any,("profilePic,2")

router.post("",single("profilePic","single"), async (req, res) => {
  try {
    //console.table({name:"sheelu",age:22});
    //const users = await User.find().lean().exec();
    // console.log(path.join(__dirname,"../uplodes"));
    // console.log(req.body);
    // console.log(req.file);

    // const filePaths = req.files.map((file) =>{
    // //    console.log({file});

    //    return file.path;
    // });
    const user = await User.create({
      firstName: req.body.firstName,
      profilePic: req.file.path,
    });
    // console.log(user)
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/multiple",single("profilePic","multiple"), async (req, res) => {
  try {
    //console.table({name:"sheelu",age:22});
    //const users = await User.find().lean().exec();
    // console.log(path.join(__dirname,"../uplodes"));
    // console.log(req.body);
    // console.log(req.file);

    // const filePaths = req.files.map((file) =>{
    // //    console.log({file});

    //    return file.path;
    // });
    // const user = await User.create({
    //     firstName: req.body.firstName,
    //     ProfilePic:filePaths,
    // });
    const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const user = await User.create({
        firstName: req.body.firstName,
        profilePic: filePaths,
      });
  // console.log(filePaths)

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
