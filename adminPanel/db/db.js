require('dotenv').config()
let mongoose = require('mongoose')

let connectDB  = async () => {

   try {
     await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false })
    .then(res => console.log(`database connected`))
    .catch(err=>console.log(`connection err ${err}`))

      
   } catch (err) {
       console.log(err)
   }
}


module.exports = connectDB