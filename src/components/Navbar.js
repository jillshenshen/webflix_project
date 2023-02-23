import React, { useState ,useRef,useEffect} from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import w from '../assets/w.png'
import {FaPowerOff, FaSearch}from 'react-icons/fa'
import {VscTriangleDown, VscTriangleUp}from 'react-icons/vsc'
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
  const [showMenu,setShowMenu]=useState(false)
  const [menuHover,setMenuHover]=useState(false)
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

  const handleMenu=()=>{
    setTimeout(()=>{
      setShowMenu(false)
    },500)
    
  }


  

  return (
    <Container>
        <nav className={`flex ${isScrolled? "scrolled":""}`}>
           <div className="left flex a-center">
              <div className="brand flex a-center j-center">
                 <img src={logo} alt="logo"   className="logo-img"/>
              </div>
              <li 
              onMouseEnter={()=>setShowMenu(true)}
              onMouseLeave={()=>handleMenu()}
              className='menu'>Menu<VscTriangleDown/></li>
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
           <div className={showMenu || menuHover?'menu-div':'menu-div menu-none'}
             onMouseEnter={()=>setMenuHover(true)}
              onMouseLeave={()=>setMenuHover(false)}
           >
           <VscTriangleUp/>
            <ul className='menu-ul'>
               
             {links.map(({name,link})=>{
                return(
                  <li key={name} ><Link to={link}  onClick={e => {  
                  
                  handleClick() }}>{name}</Link></li>
                )

             })}
            </ul>
           </div>
   
        </nav>
    </Container>
  )
}



const Container=styled.div`
  position:relative;
  
  .scrolled{
 
    background-color:black;
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
      font-weight:600;
      gap:2rem;
     
      .brand{
       
        img{
          height:10rem;
          margin-top:0.5rem;

        }
      }
      .menu{
            display:none;
            svg{
              margin-top:0.2rem;
              margin-left:0.2rem;
            }
          }
      .links{
         
          list-style-type:none;
          gap:2rem;
          li{
             &:hover{
          opacity:0.8;
           }
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

      .menu-div{
        z-index:999;
        position:absolute;
        top:4.7rem;
        left:2.8rem;
        background-color:rgba(0, 0, 0, 0.9);
        width:15rem;
        height:220px;
        svg{
            position:absolute;
            font-size:1.2rem;
            top:-0.8rem;
            left: 50%;
            transform: translateX(-50%);

          }

         .menu-ul{
    
          text-align:center;
          list-style-type:none;
          font-weight:600;
          pointer-events: auto;
         
       
          li{
            display:block;
            pointer-events: auto;
            padding:18px 0;
      
         
             &:hover{
              pointer-events: auto;
              background-color: rgba(187, 185, 185, 0.1);
           }
            a{
              color:white;
              text-decoration:none;
            }
          }
         } 
      

      }
      .menu-div::before{
          content:"";
          display:block;
          height:0.1rem;
          width:100%;
          background-color:white;
        }

      .menu-none{
        display:none;
      }  
  }

  @media (max-width: 850px) {
    nav{
      padding-left:0rem;
      .left{
        .menu{
        display:flex;
        position:absolute;
        left:7rem;
        cursor:pointer;
      }
    
      .brand{
        img{
        
          margin-top:0rem;

        }
      }
    }
   
    .links{
      gap:0rem;
      display:none;
    }
    .logo-img{
      content: url(${w});
      width:70%;
      height:50%;
      
      
    }
  }

  @media (max-width: 465px) {
    .right{
      .search{
        svg{
          display:none;
        }
       
      }
    }
  }
  

`