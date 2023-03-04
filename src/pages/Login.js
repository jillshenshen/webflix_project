import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../components/Background.js'
import Header from '../components/Header.js'
import { app } from '../utils/firebase-config.js'
import 'firebase/compat/auth'
import { AppContext } from "../App.js";
import mini from '../assets/mini.gif'



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
    //這裡會印出User的資訊
    if (user) {
      setEmail(user.email);
      navigate("/");
      // User is signed in.
    }
  });

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
              />
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
              />
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
        color:white;
    

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
                padding:0.5rem 1rem;
                width:15rem;
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





