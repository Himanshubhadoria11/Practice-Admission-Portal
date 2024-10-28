const express = require('express')
const FrontController = require('../controller/FrontController')
const route = express.Router()
const checkUserAuth=require('../middleware/auth')
const CourseController = require('../controller/CourseController')
const AdminController = require('../controller/AdminController')
const adminrole =require('../middleware/adminrole')


//routing path http://localhost:4000/ (/)
route.get('/', FrontController.login)
route.get('/register', FrontController.register)
route.get('/home',checkUserAuth, FrontController.home)
route.get('/about', checkUserAuth,FrontController.about)
route.get('/contact',checkUserAuth, FrontController.contact)
route.get('/profile',checkUserAuth, FrontController.profile)
route.post('/changePassword',checkUserAuth, FrontController.changePassword)
route.post('/updateProfile',checkUserAuth, FrontController.updateProfile)

//course
route.post('/course_insert',checkUserAuth, CourseController.courseInsert)
route.get('/courseDisplay',checkUserAuth, CourseController.courseDisplay)
route.get('/courseView/:id',checkUserAuth, CourseController.courseView)
route.get('/courseEdit/:id',checkUserAuth, CourseController.courseEdit)
route.post('/courseUpdate/:id',checkUserAuth, CourseController.courseUpdate)
route.get('/courseDelete/:id',checkUserAuth, CourseController.courseDelete)


//admin controller
route.get('/admin/display',checkUserAuth,adminrole('admin'), AdminController.display)
route.post('/admin/updateStatus/:id',checkUserAuth,adminrole('admin'),AdminController.updateStatus)
route.post('/contact_insert',checkUserAuth, AdminController.contactInsert)
route.get('/admin/contactdisplay',checkUserAuth,adminrole('admin'), AdminController.contactDisplay)



//forgot password
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset-password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)



//insert data
route.post('/userInsert', FrontController.UserInsert)
route.post('/verifyLogin', FrontController.verifyLogin)
route.get('/logout', FrontController.logout)
route.get('/verify',FrontController.verifymail)


module.exports = route