const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login',adminController.adminLogin)
router.get('/users',adminController.getUsers)
router.delete('/removeuser/:id', adminController.removeUser);
router.post('/adduser',adminController.addUser)
router.put('/updateuser/:id',adminController.updateUser)


module.exports = router