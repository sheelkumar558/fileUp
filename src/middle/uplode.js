const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //cb= callback
    callback(null, path.join(__dirname, "../uplodes"));
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now();
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

//const upload = multer({ storage: storage })
const fileFilter = (req, file, callback) => {
  // The function should call `callback` with a boolean
  // to indicate if the file should be accepted

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // To accept the file pass `true`, like so:
    callback(null, true);
  } else {
    // To reject this file pass `false`, like so:
    callback(new Error("Incorrect mime type"), false);
  }
};

const options = {
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};

// module.exports = (req,res,next) =>{

//     return next();
// }

const uplodes = multer(options);
const single = (formKey,method) => {
  return function (req, res, next) {
  let uplodedItem;
  if(method == "single"){
    uplodedItem= uplodes.single(formKey);
  }else if(method == "multiple"){
    uplodedItem= uplodes.any(formKey);
  }
    
    return uplodedItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ message: err.message });
      } else if (err) {
        return res.status(501).send({ message: err.message });
      }
      //req.filePath = req.file.path;
      return next();
    });
  };
};

// const multiple = (formKey) =>{
//    return function(req,res,next){
//        const uplodedItems = uplodes.any("profilePic");
//        return uplodedItems(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//           return res.status(500).send({ message: err.message });
//         } else if (err) {
//           return res.status(501).send({ message: err.message });
//         }
//         req.filePath = req.file.path;
//         return next();
//       });
//    }
// };

module.exports = {single};
