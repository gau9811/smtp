import React,{ useState }  from 'react'
import {SignupApi} from '../helper/ApiCalls'
import {Button, Col, Row ,Input} from 'reactstrap'
import { Redirect,Link } from 'react-router-dom'
 



const Signup = () => {

let [email,setEmail] = useState("")
let [password,setPassword] = useState("")
let [name,setName] = useState("")
let [file,setfile] = useState(null)
let [toggle,setToggle] = useState(false)
let [toggle2,setToggle2] = useState(false)

let [msg,setMsg] = useState('')
let [msg2,setMsg2] = useState('')



let handleSubmit = () => {
   
    if (email === '' && password === '' && file === null && name === '') {
        setPassword(true)
        setMsg("The field is empty")
    }else{

 
    SignupApi({email,password,name})
   .then(res => {
       if (res?.data?.message) {        
           setToggle2(true)    
           setMsg2('Register Successfully')
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

    return (
        <div>
        <div> 
        {toggle && (
            <p className="text text-danger text-center">{msg}</p>
        )}
        {toggle2 && (
         <p className="text text-success text-center">{msg2}</p>
        )}
       <div className="wrapper fadeInDown" style={{marginTop:"100px"}}>
          <div className="formContent">
         <div className="fadeIn first">
         </div>
         <Row>  
         <Col sm="12">
         <Input type="text"  className="fadeIn second mt-4 w-50" name="login" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
       </Col>
         <Col sm="12">
           <Input type="email"  className="fadeIn second mt-4 w-50 ml-4" name="login" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
         </Col>
         
         <Col sm="12" className="text text-center" > 
         <div className="text text-center ml-5">
            <Input type="password"  className="fadeIn third mt-2 mb-2 w-50 text text-center " name="password" placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            </Col>
         
         <Col sm="12">
            <Button type="button" className="fadeIn fourth btn btn-primary mb-2"  onClick={handleSubmit}>Signup</Button>
         </Col>
          <Col sm="12">
            <div className="formFooter">
            <a clasName="underlineHover" href="#">Forgot Password?</a>
          </div>
          </Col>
          <Col sm="12">
          <div className="formFooter">
          <Link to="/">
             <a clasName="underlineHover" href="#">already Signup?login</a>
             </Link>
           </div>
        </Col>
          <Col sm="12">
        </Col>
          </Row>  
        </div>
      </div>
      </div>  
        </div>
    )
}

export default Signup
