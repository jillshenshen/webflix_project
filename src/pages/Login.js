import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../components/Background.js'
import Header from '../components/Header.js'
import { app } from '../utils/firebase-config.js'
import 'firebase/compat/auth'


export default function Login(){
  const navigate= useNavigate()
  const [errorMsg,setErrorMsg]=useState("")
  const [error,setError]=useState(false)
  const [formValue,setFormValue]=useState({
   email:"",
   password:"",
  }) 


  const handleLogIn=async()=>{
    try{
      const {email,password}=formValue
      await app.auth().signInWithEmailAndPassword(email,password)

    }catch(error){
      setError(true)
      console.log(error.code)
      if(error.code==="auth/invalid-email" || error.code==="auth/user-not-found" ){
        setErrorMsg("Not found this email,please sign up first")
    }else if(error.code==="auth/wrong-password"){
      setErrorMsg("Wrong password")
      }else{
        setErrorMsg("Login failed")
      }
    }
  }

  app.auth().onAuthStateChanged(function(user) {
   //這裡會印出User的資訊
   if (user) {
      navigate("/")
     // User is signed in.
   }})

  return (
       
        
   <Container>
      <Background/>
      <div className="content">
         <Header />
         <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
                <div className="title">
                    <h3>Login</h3>
                </div>
             
              
                
                <div className="container flex column">
                <input type="email" placeholder='Email Address' name='email' value={formValue.email} onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})}/>
                <input type="password" placeholder='Password' name='password' 
                    value={formValue.password} onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})}

                    />
                      {error? <p className='error'>Error: 
                  <span>   {errorMsg}</span></p>:""}
                  <button onClick={handleLogIn}>Log In</button>
                </div>
            </div>
         </div>
      </div>
  

   </Container> 
      
      
  )
}

const Container = styled.div`
position:relative;

.content{
   position:absolute;
   top:0;
   left:0;
   background-color:rgba(0,0,0,0.5);
   height:100vh;
   width:100vw;
   display:grid;
   grid-template-rows:15vh 85vh;

   .form-container{
      gap:2rem;
      height:85vh;
     
      .form{
        padding:2rem;
        width:320px;
        background-color:#000000b0;
        gap:2rem;
        color:white;
    

        .error{
          color:#e50914;
          padding:0 1rem;
      
        }
       
        .container{
            gap:2rem;
            input{
                padding:0.5rem 1rem;
                width:15rem;
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
        }
      }
   }
}


`;



