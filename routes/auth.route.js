const express = require('express')
const { register, login } = require('../controller/auth.controller.js')
const verifyjwt = require('../middleware/auth.middleware.js')



const authRoutes = express.Router()

authRoutes.route('/register').post(register)
authRoutes.route('/login').post(verifyjwt,login)


module.exports = authRoutes