import React from 'react'
import {Route, Switch} from "react-router-dom"
import ForgetPassword from '../component/ForgetPassword'
import Signup from '../component/Signup'
import PrivateRoute from './PrivateRoute'
import Homepage from '../component/Homepage'
import ResetPassword from '../component/ResetPassword'


const Routing = () => {
    return (
    <Switch>
        <Route path="/Signup" component={Signup} />
        <Route  path="/forgetPassword" component={ForgetPassword}/> 
        <PrivateRoute path="/Home" component={Homepage}/>
        <PrivateRoute path="/reset" component={ResetPassword}/>
    </Switch>
    )
}

export default Routing
