import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const Homepage = () => {

let handleClick = () => {
    localStorage.removeItem("token")
}


    return (
        <div>
            <Link to="/reset">Reset Password</Link>
            <Link to="/"><Button onClick={handleClick}>Signout</Button></Link>
        </div>
    )
}

export default Homepage
