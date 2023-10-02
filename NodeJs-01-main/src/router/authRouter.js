const express = require ('express');
const router = express.Router('../router/authRouter');
const AuthController = require ('../router/authRouter');

router.post('/login', authController.AuthController);
