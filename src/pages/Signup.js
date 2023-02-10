import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../components/Background.js'
import Header from '../components/Header.js'
import { app,db } from '../utils/firebase-config.js'
import { setDoc,doc } from "firebase/firestore";
import 'firebase/compat/auth'


export default function Signup(){
  const navigate= useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [formValue,setFormValue]=useState({
   email:"",
   password:"",
  }) 
  const handleSignIn=async()=>{
    try{
      const {email,password}=formValue
      await app.auth().createUserWithEmailAndPassword(email,password);
            setDoc(doc(db,'users',email),{
               savedShows:[],
               toWatch:[],
               watching:[],
               watched:[],
               drop:[]
            })
          

    }catch(err){
      console.log(err)
    }
  }

  app.auth().onAuthStateChanged(function(user) {
   
    //這裡會印出User的資訊
   if (user) {
      navigate("/")
     // User is signed in.
   }})

  return (
       
        
   <Container showPassword={showPassword}>

      <Background/>
    
      <div className="content">
      <Header login />
      <div className="body flex column a-center j-center">
        <div className="text flex column">
           <h1>Unlimited movies, TV shows and more</h1>
           <h4>Watch anywhere.Cancel anytime.</h4>
           <h6>
             Ready to watch? Enter your email to create or restart membership
           </h6>
        </div>   
        <div className="form">
        <input type="email" placeholder='Email Address' name='email' value={formValue.email} onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})}/>
        {showPassword &&   <input type="password" placeholder='Password' name='password' 
        value={formValue.password} onChange={(e)=>setFormValue({...formValue,[e.target.name]:e.target.value})}

        />}
      
        {!showPassword && <button onClick={()=>setShowPassword(true)}>Get Start</button>}
      </div>
        <button onClick={handleSignIn}>Sign up</button>
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

   .body{
      gap:1rem;
      .text{
         gap:1rem;
         text-align:center;
         font-size:1.5rem;
         
         h1{
            padding:0 25rem;
         }
      }
      .form{
         display:grid;
         grid-template-columns:${({showPassword})=>showPassword ? "1fr 1fr":"2fr 1fr"} ;
         width:60%;
         input{
            color:black;
            border:none;
            padding:1.5rem;
            font-size:1.2rem;
            border:1px solid black;
            &:focus{
               outline:none;
            }
         }
         button{
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            font-weight:bolder;
            font-size:1.05rem
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
            font-size:1.05rem
      }
   }
}


`;



