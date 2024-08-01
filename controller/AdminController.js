const CourseModel = require('../models/course')
const ContactModel = require('../models/contact')
const nodemailer = require('nodemailer')

class AdminController{

    static display = async (req,res)=>{
        try{
            const {name,email,image,id,role}=req.Udata
            const course =await CourseModel.find()
            res.render('admin/display',{n:name,i:image,c:course,role: role ,msg:req.flash('success')})

        }catch(error){
            console.log(error)
        }
    }
    static updateStatus = async (req,res)=>{
        try{
            //console.log(req.body)
            const {name,email,status,comment,course} =req.body
            const update = await CourseModel.findByIdAndUpdate(req.params.id,{
                status:status,
                comment:comment
            })
            this.sendEmail(name,email,course,status,comment)
            req.flash("success", "Status Update Successfully")
            res.redirect('/admin/display')

        }catch(error){
            console.log(error)
        }
    }

    static sendEmail = async (name, email,course,status, comment) => {
        // console.log(name,email,status,comment)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "himanshubhadoria22@gmail.com",
                pass: "wflsaqkhzdpuapmw",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: `${course} Course ${status}`, // Subject line
            text: "heelo", // plain text body
            html: `<b>${name}</b> ${course} Course  <b>${status}</b> successful! <br>
             <b>Comment from Admin</b> ${comment} `, // html body
        });
    }
    // https://myaccount.google.com/apppasswords?

    static contactInsert = async (req, res) => {
        try {
            //console.log(req.body)
            const { name, email, address,comment }
                = req.body
            const result = new ContactModel({
                name: name,
                email: email,
                
                address: address,
                comment:comment,
                
                user_id: req.Udata.id
            })
            await result.save()
            this.sendEmail(name,email,address,comment)
            res.redirect('/contact')
        } catch (error) {
            console.log(error)
        }

    }


    static contactDisplay = async (req, res) => {
        try {
            const { name, email, address,comment, id,role ,image} = req.Udata
            const contact = await ContactModel.find({ user_id: id })
            console.log(contact)
            res.render('admin/contactdisplay', { n: name, e:email, a:address,i:id,role:role,i:image,c:contact,co:comment})
        } catch (error) {
            console.log(error)
        }
    }




}
module.exports =AdminController