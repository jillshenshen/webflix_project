import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import styled from 'styled-components'




const Header = (props) => {
    const navigate= useNavigate()
  return (
    <Container>
       <div className="logo">
           <img src={logo} alt="logo" />
       </div>
       <button onClick={()=>navigate(props.login? "/login" : "/signup")}>{props.login?"Log in" :"Sign up"}</button>
    </Container>
  )
}

const Container=styled.div`

 display:flex;
 justify-content: space-between;
 align-items: center;
 padding:0 4rem;


 .logo{
    img{
        width:10rem;
       
    }
 }

 button{
    padding:0.5rem 1rem;
    background-color:#e50914;
    border:none;
    cursor:pointer;
    color:white;
    border-radius:0.2rem;
    font-weight:bolder;
    font-size:1.05rem;
 }
 @media (max-width:450px) {
   padding:0 1rem;
 }



`

export default Header