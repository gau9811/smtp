let jwt = require('jsonwebtoken')
require('dotenv').config()



module.exports = async (req,res,next) => {
  let token = req.header('token')

  if (!token) {
      res.json({error:'There is no token'})
  }


  try {
      
  if (token) {
      await jwt.verify(token , process.env.SECRET,(err,decoded)=>{
        if (console.log(decoded.role === 1)) {
            req.admin = decoded
            console.log('this is admin middleware')
            next()
        }else if (decoded.role === 0) {
             req.user = decoded
             console.log('this is user middleware')
             next()
        }
        else{
                res.status(400).json({error:'something wrong with middleware'})
            }
        
      })

      
  }
   } catch (error) {
      res.json({error:'internel server error'})
   }

}

