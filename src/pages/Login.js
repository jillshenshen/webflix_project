import React, { useState,useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../components/Background.js'
import Header from '../components/Header.js'
import { app } from '../utils/firebase-config.js'
import 'firebase/compat/auth'
import { AppContext } from "../App.js";
import mini from '../assets/mini.gif'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'



export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [logSuccess, setLogSuccess] = useState(false);
  const { setEmail } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleLogIn = async () => {
    setLogSuccess(true);
    try {
      const { email, password } = formValue;
      await app.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(true);
      setLogSuccess(false);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMsg(
          "Sorry, we can't find an account with this email address. Please try again or  create a new account."
        );
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Wrong password.Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg(
          "Login failed too many times.Please try again in ten minutes."
        );
      } else if (error.code === "auth/internal-error") {
        setErrorMsg("Please enter your password.");
      } else {
        setErrorMsg("Login failed.Please try again.");
      }
    }
  };

  app.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
      navigate("/");
    }
  });

  const handleTogglePassword = () => {
    inputRef.current.focus();
    setShowPassword((prev) => !prev);
    
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogIn();
    }
  };

  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>

            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <div className="pass-div"  >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formValue.password}
                ref={inputRef}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <div className="icon" onClick={handleTogglePassword}>
                {showPassword?<AiFillEyeInvisible/>:<AiFillEye/>}
              </div>

              </div>
             
              {error ? (
                <p className="error">
                  <span> {errorMsg}</span>
                </p>
              ) : (
                ""
              )}

              <button onClick={handleLogIn}>
                {logSuccess ? (
                  <img src={mini} alt="mini" className="mini" />
                ) : (
                  "Log in"
                )}
              </button>
              <h4>
                New to Webflix?
                <span>
                  <a href="/signup" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign up now.
                  </a>
                </span>
              </h4>
            </div>
          </div>
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

   .form-container{
      gap:2rem;
      height:85vh;
     
      .form{
        padding:2rem;
        width:320px;
        background-color:#000000b0;
        gap:2rem;
     
    

        .error{
          color:#fff;
          padding:0.5rem 1rem;
          background-color:#e87c03;
          width:15rem;
          border-radius:0.2rem;
          
        }
       
        .container{
            gap:2rem;
            input{
                color:white;
                caret-color: white;
                padding:0.7rem 1rem;
                width:15rem;
                background-color:#333333 !important;
                border: none;
                border-radius:0.2rem;
            }

            input:focus {
              outline:none;
              border: 1px solid #e87c03;
              background-color: #424242 !important;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-box-shadow: none;
                      box-shadow: none;
              color: inherit !important;
              background-color: transparent !important;
              transition: background-color 5000s ease-in-out 0s;
            }

            input:-webkit-autofill{
                -webkit-text-fill-color: white !important;
            }
            .pass-div{
              position:relative;
              .icon{
                cursor:pointer;
                font-weight:400; 
                color:#808080;
                position:absolute;
                top: 50%;
                right: 1rem;
                transform: translateY(-50%);
              }
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
                }
            }
            h4{
              color:grey;
              font-weight:400;
              a{
                color:white;
              }
              span:hover {
                text-decoration: underline;
              }
            }
        }
      }
   }
}


`;





