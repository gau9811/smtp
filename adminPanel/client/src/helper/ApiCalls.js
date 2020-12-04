let Axios = require('axios')




let loginApi = ({email,password}) => {
    console.log(email)
 return Axios('/api/login',{
      method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      data:JSON.stringify({email:email , password:password})
  })
}

let SignupApi = ({email,password,name}) => {
 return Axios('/api/Signup',{
      method:"POST",
      headers:{
          Accept:'application/json',
        'Content-Type': 'application/json'
      },

      data:JSON.stringify({email:email , password:password ,name:name  })
     
  })
}

let ResetPassword = async ({email,password,prevpassword}) => {
    console.log(email,prevpassword,password)
    return await Axios('/api/resetPassword',{
         method:"PUT",
         headers:{
            Accept:'application/json',
           'Content-Type': 'application/json',
           "token":localStorage.getItem("token")
         },
   
         data:JSON.stringify({email:email , prevpassword:prevpassword ,password:password  })
        
     })
   }
   
   
   let Forgetpassword = async ({email}) => {
    return await Axios('/api/FORGETPASSWORD',{
         method:"POST",
         headers:{
            Accept:'application/json',
           'Content-Type': 'application/json',
         },
   
         data:JSON.stringify({email:email})
        
     })
   }


module.exports = {
    SignupApi,
    loginApi,
    ResetPassword,
    Forgetpassword
}