const express =require('express')// express is needed for instance of an express router

const router=express.Router()
const {login,signup} =require('../controllers/userController')

router.post('/login',login)

router.post('/signup',signup)

module.exports=router