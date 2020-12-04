let express = require('express')
let router = express()
let multer = require('multer')
let storage = multer.memoryStorage()
let upload = multer({ storage: storage })
let User = require('../models/User')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config()
let CheckAprofile = require('../middleware/CheckAprofile')
let nodemailer = require('nodemailer')


router.post('/Signup'  , async(req,res)=>{
   
    const { name, email , password } = req.body
   
    let file  = req.file

    if (!name || !email || !password ) {
        res.json({message:`Please fill the fields`})
    }
  
    try {
      let CheckUser = await User.findOne({email:email})

      if (CheckUser) {
          res.json({error:`There is Already a email id exist at this name ${email}`})
      }

      if (!CheckUser) {
        const salt = bcrypt.genSaltSync(10);
          
          let newUser = { 
             name: name,
             email: email,
             password: bcrypt.hashSync(password,salt),
          
          }

          
          let saveUser =  new User(newUser)

          saveUser.save()

          res.json({message:"user has been saved"})
        }
      
    } catch (error) {
       res.status(500).json({error:'Internel server Error'}) 
    }
  
   

})


router.post('/login', async (req,res) => {
    let { email , password } = req.body

    if (!email || !password) {
        res.json({message:`Please fill the fields`})
    }

    try {
        let CheckUser = await User.findOne({email:email})
  
        if (!CheckUser) {
            res.json({error:`There is Already a email id exist at this name ${email}`})
        }
  
        if (CheckUser) {
            
          let hashPassword = bcrypt.compareSync(password, CheckUser.password)

          if (hashPassword) {
            let token = jwt.sign({ id:CheckUser._id ,role:CheckUser.role }, process.env.SECRET,{ expiresIn: 60 * 60 });
            res.json({token:token})
           }else{
               res.json({error:"password Incorrect"})
           }
         
  
          }
        
      } catch (error) {
         res.status(500).json({error:'Internel server Error'}) 
      }
    
})



router.put('/resetPassword' , CheckAprofile , async (req,res) => {
    let { email , prevpassword ,password } = req.body
     
    console.log(email , prevpassword ,password)
    if (!email && !password) {
        res.json({error:'please provide email or passsword'})
    }

     
    let CheckUser  = await User.findOne({ email })

    try {
        
     if (CheckUser) {
         
        let checkPrevPassword = bcrypt.compareSync(prevpassword, CheckUser.password);
        
        if (checkPrevPassword) {
          
        const salt = bcrypt.genSaltSync(10);
        
        let hashpassword =  bcrypt.hashSync(password,salt)

        var checkUpdate
       
        await User.findOneAndUpdate({email:email},{$set :{ password: hashpassword }},{ new:true, upsert:true},(err,update)=>{
           if (err) {
               checkUpdate = false
           }
           
           if(update){
               checkUpdate = true
           }
       })

           if (checkUpdate) {
               res.json({message:"Password update succesfully"})
           } else {
            res.json({error:"Password not updated succesfully"})
           }

      }else{
         if (!checkPrevPassword) {
             res.json({message:'password does not match'})
         }
      }
    }

    } catch (err) {
        res.json({error:"Internel Server Error"})
    }


})

router.post('/FORGETPASSWORD', async (req,res)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    await transporter.sendMail({
        from:'bajajgaurav367@gmail.com',
        to:req.body.email,
        subject:"FORGET PASSWORD",
        text:"http://localhost:3000/"
    }).then(response=>res.json({message:'check your gmail'}))
    .catch(err=> res.json({error:'failed to change forget password'}))
})




module.exports = router