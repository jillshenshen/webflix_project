import React, { useState ,useRef,useEffect} from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import w from '../assets/w.png'
import {FaPowerOff, FaSearch}from 'react-icons/fa'
import {AiOutlineClose}from 'react-icons/ai' 
import { app } from '../utils/firebase-config.js'
import { Link } from 'react-router-dom';
import 'firebase/compat/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getSearch } from '../store/index.js'


export default function Navbar({isScrolled,setData,setIsData,data}) {
  const dispatch=useDispatch();
  const navigate= useNavigate()
  const links=[
    {name:"Home",link:"/"},
    {name:"TV Shows",link:"/tv"},
    {name:"Movies",link:"/movies"},
    {name:"My list",link:"/mylist"}
  ]

  app.auth().onAuthStateChanged(function(user) {
    //這裡會印出User的資訊

 
    if (!user) {
       navigate("/login")
      // User is signed in.
    }})
   
  const [showSearch,setShowSearch]=useState(false) 
  const [inputHover,setInputHover]=useState(false) 
  const inputRef = useRef(null);
  
  useEffect(() => {
    if(showSearch){
      setTimeout(() => {
        inputRef.current.focus();
      }, 500)
    }
  }, [showSearch]);


  const handleClick = () => {
    setIsData(false);
    setShowSearch(false);
    setData("");
    dispatch(getSearch("%$#"));
    window.scrollTo({
      top: 0,
      behavior: 'auto',   
    });
  };

  const handleClose=()=>{
    setShowSearch(false);
    setInputHover(false);
    setData("")
    dispatch(getSearch("%$#"));
  }


  

  return (
    <Container>
        <nav className={`flex ${isScrolled? "scrolled":""}`}>
           <div className="left flex a-center">
              <div className="brand flex a-center j-center">
                 <img src={logo} alt="logo"   className="logo-img"/>
              </div>
              <ul className='links flex'>
             {links.map(({name,link})=>{
                return(
                  <li key={name}><Link to={link}  onClick={e => {  
                  
                    handleClick() }}>{name}</Link></li>
                )

             })}

             </ul>
           </div>
           <div className="right flex a-center">
               <div className={`search ${showSearch?"show-search":""}`}>
                 <button
                  onFocus={()=>setShowSearch(true)}
                  onBlur={()=>{
                    if(!inputHover){setShowSearch(false)}
                  }}
             
                 >
                    <FaSearch/>
                 </button>

                 <input type="text" placeholder='search' 
                  value={data} 
                  ref={inputRef}
                  onMouseEnter={()=>setInputHover(true)}
                  onBlur={
                    ()=>{
                      if(data===''){
                        setShowSearch(false);
                        setInputHover(false);

                      }
                     
                    }}

                    onChange={(event) => {
                    setData(event.target.value);
                    }}   
                 
                 />
                 <button className={`close ${data!=""?"show-close":""}`} 
                 onClick={()=>{
                  handleClose()
                 }}
                 >
                 <AiOutlineClose/>
                 </button>
              
               </div>
               <button onClick={()=>app.auth().signOut()}><FaPowerOff/></button>
           </div>  
   
        </nav>
    </Container>
  )
}



const Container=styled.div`
  
  .scrolled{
 
    background-color:grey;
  }
  nav{
    position:sticky;
    top:0;
    height:4.5rem;
    width:100%;
    justify-content:space-between;
    position:fixed;
    z-index:100;
    padding:0 2.5rem;
    align-items:center;
    transition:0.3s ease-in-out;
    .left{
      gap:2rem;
      .brand{
        img{
          height:12rem;
          margin-top:0.5rem;

        }
      }
      .links{
          list-style-type:none;
          gap:2rem;
          li{
            a{
              color:white;
              text-decoration:none;
            }
          }
      }
    }
      .right{
        gap:1rem;
        button{
          background-color:transparent;
          border:none;
          cursor:pointer;
          &:focus{
            outline:none;
          }
          svg{
            color:#f34242;
            font-size:1.2rem;
          }
        }
        .search{
          display:flex;
          gap:0.4rem;
          align-items:center;
          justify-content:center;
          padding:0.2rem;
          padding-left:0.5rem;
          button{
            background-color:transparent;
            svg{
              color:white;
            }
          }
          input{
            width:0;
            opacity:0;
            visibility:hidden;
            transition:0.3s ease-in-out;
            background-color:transparent;
            border:none;
            color:white;
            &:focus{
              outline:none;
            }
          }
        }
        .show-search{
            border:1px solid white;
            background-color:rgba(0,0,0,0.5);
            input {
              width:100%;
              opacity:1;
              visibility:visible;
              padding:0.3rem;
            }

          }
        .close{
          visibility:hidden;
        } 
        .show-close{
          visibility:visible;
        } 
      }
  }

  @media (max-width: 850px) {
    .links{
      display:none;
    }
    .logo-img{
      content: url(${w});
      width:10rem;
      
      
    }
  }

`