import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../components/Background.js'
import Header from '../components/Header.js'
import { app,db } from '../utils/firebase-config.js'
import { setDoc,doc } from "firebase/firestore";
import 'firebase/compat/auth'
import mini from '../assets/mini.gif'


export default function Signup() {
   const navigate = useNavigate();
   const [errorMsg, setErrorMsg] = useState("");
   const [error, setError] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [formValue, setFormValue] = useState({
     email: "",
     password: "",
   });
   const [signSuccess, setSignSuccess] = useState(false);
 
   const handleSignIn = async () => {
     setSignSuccess(true);
     try {
       const { email, password } = formValue;
       await app.auth().createUserWithEmailAndPassword(email, password);
       setDoc(doc(db, "users", email), {
         savedShows: [],
         toWatch: [],
         watching: [],
         watched: [],
         drop: [],
       });
     } catch (error) {
       setError(true);
       setSignSuccess(false);
       console.log(error.code);
       if (error.code === "auth/invalid-email") {
         setErrorMsg("Please enter valid email.");
       } else if (error.code === "auth/weak-password") {
         setErrorMsg("Weak password,please enter at least six characters. ");
       } else if (error.code === "auth/email-already-in-use") {
         setErrorMsg(" This Email is already in use,please enter another one.");
       } else if (error.code == "auth/internal-error") {
         setErrorMsg(
           "Please click Get start to set up at least six characters password."
         );
       } else {
         setErrorMsg("Sign up failed,please try again");
       }
     }
   };
 
   app.auth().onAuthStateChanged(function (user) {
     if (user) {
       navigate("/"); 
     }
   });

   const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
   };
 
   return (
     <Container showPassword={showPassword}>
       <Background />
 
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
             <input
               type="email"
               placeholder="Email Address"
               name="email"
               value={formValue.email}
               onChange={(e) =>
                 setFormValue({ ...formValue, [e.target.name]: e.target.value })
               }
               onKeyPress={handleKeyPress}
             />
             {showPassword && (
               <input
                 type="password"
                 placeholder="Password"
                 name="password"
                 value={formValue.password}
                 onChange={(e) =>
                   setFormValue({
                     ...formValue,
                     [e.target.name]: e.target.value,
                   })
                 }
                 onKeyPress={handleKeyPress}
               />
             )}
 
             {!showPassword && (
               <button onClick={() => setShowPassword(true)}>Get Start</button>
             )}
           </div>
           {error ? (
             <p className="error">
               Error: <span> {errorMsg}</span>
             </p>
           ) : (
             ""
           )}
           <button onClick={handleSignIn}>
             {signSuccess ? (
               <img src={mini} alt="mini" className="mini" />
             ) : (
               "Sign up"
             )}
           </button>
         </div>
       </div>
     </Container>
   );
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
          grid-template-columns:${({ showPassword }) =>
            showPassword ? "1fr 1fr" : "2fr 1fr"} ;
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
       .error{
           color:#e50914;
           font-weight:bolder;
           background-color:rgba(0,0,0,0.6);
           padding:1rem;
           border-radius:0.2rem;
       }
    
      
       button{
             padding:0.7rem 1rem;
             background-color:#e50914;
             border:none;
             cursor:pointer;
             color:white;
             border-radius:0.2rem;
             font-weight:bolder;
             font-size:1.05rem;
             .mini{
                   width:15px;
                   margin:0 1.48rem;
                 }
       }
    }
 }
 
 @media (max-width: 1000px) {
   .content{
    .body{
      
       gap:1rem;
       .text{
          gap:1rem;
          text-align:center;
          font-size:1rem;
          
          h1{
             padding:0 20rem;
          }
       }
       .form{
          width:80%;
 
          input{
             padding:1rem;
          }
       }
 }
 
  }}
 
 
 @media (max-width:750px) {
 
    .content{
       .body{
          width:90vw;
          margin:0 auto;
          .form{
             grid-template-columns:1fr;
       
        }
 
       }
    }
    
 }
 
 
 @media (max-width:450px) {
    
 
 .content{
  
    .body{
       
       .text{
       width:90%;
       text-align:center;
       font-size:1.2rem;
       h1{
             padding:0 ;
          }
       
       }
       .form{
      
    
     }
 
    }
 }
 
 }
 
 `;
 
 



