const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {jwtAuth,verifyUser} = require('../middleware/jwtauth');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') 
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) 
    }
  });
  const upload = multer({ storage: storage });


router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)
router.post('/verify',jwtAuth,verifyUser);
router.post('/updateimage',upload.single('image'),userController.updateImage);


module.exports = router;
