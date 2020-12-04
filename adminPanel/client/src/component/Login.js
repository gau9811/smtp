import React,{ useState } from 'react'
import {loginApi} from '../helper/ApiCalls'
import {Button, Col, Row ,Input} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect,Link } from 'react-router-dom'

const Login = () => {
   
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [toggle,setToggle] = useState(false)
    let [toggle2,setToggle2] = useState(false)

    let [msg,setMsg] = useState('')
    let [msg2,setMsg2] = useState('')


    let handleSubmit = () => {
       
        if (email === '' && password === '') {
            setPassword(true)
            setMsg("The field is empty")
        }else{
      
        loginApi({email,password})
       .then(res => {
           if (res?.data?.token) {        
               setToggle2(true)    
               setMsg2('Succesfully login')
               console.log(res.data.token)
               localStorage.setItem('token', res.data.token)
           } else {
               setTimeout(()=>{
                setToggle2(false)    
                setMsg('')
               },2000)
           }

           if (res?.data?.error) {
            setToggle(true)    
            setMsg(res.data.error)
            } else {
                setTimeout(()=>{
                    setToggle(false)    
                    setMsg('')
                   },2000)
            }
       }).catch(err=>console.log(err))
    }
}

let PerformRedirect = () => {
    if (localStorage.getItem("token")) {
        return <Redirect to="/Home"/>
    }
}



return (
  <div> 
   {toggle && (
       <p className="text text-danger text-center">{msg}</p>
   )}
   {toggle2 && (
    <p className="text text-success text-center">{msg2}</p>
   )}
   {PerformRedirect()}
  <div className="wrapper fadeInDown" style={{marginTop:"100px"}}>
     <div className="formContent">
    <div className="fadeIn first">
    </div>
    <Row> 
    <Col sm="12">
      <Input type="text"  className="fadeIn second mt-4 w-50" name="login" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </Col>
    
    <Col sm="12" className="text text-center " > 
    <div className="text text-center ml-5">
       <Input type="password"  className="fadeIn third mt-2 mb-2 w-50 text text-center ml-5" name="login" placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
       </div>
       </Col>
    
    <Col sm="12">
       <Button type="button" className="fadeIn fourth btn btn-primary mb-2"  onClick={handleSubmit}>Login</Button>
    </Col>
     <Col sm="12">
     <div className="formFooter">
        <Link to="/forgetPassword"><a clasName="underlineHover" href="#">Forgot Password?</a></Link>
     </div>
     </Col>
     <Col sm="12">
     <Link to="/Signup">
     <div className="formFooter">
     <a clasName="underlineHover" href="#">No account Signup</a>
   </div>
   </Link>
   </Col>
     <Col sm="12">
   </Col>
     </Row>  
   </div>
 </div>
 </div>  
    )
}

export default Login
