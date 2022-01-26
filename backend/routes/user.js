// const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-all', userController.getAll);

router.post('/login', userController.login);

router.post('/add-user', userController.postUser)

router.put('/update-user', userController.updateUser)

router.delete('/delete-user/:userId', userController.deleteUser)

router.delete('/delete-multiple-user', userController.deleteMultipleUser)

module.exports = router;
