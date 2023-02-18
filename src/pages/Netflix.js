import React, { useState ,useContext} from 'react'
import Navbar from  '../components/Navbar.js'
import home from '../assets/home.jpg'
import peaky from '../assets/peaky.png'
import aftersun from '../assets/aftersun.jpeg'
import bleu from '../assets/bleu.jpeg'
import love from '../assets/love.jpeg'
import { FaPlay } from 'react-icons/fa'
import {AiOutlineInfoCircle} from  'react-icons/ai'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'
import { useEffect } from 'react'
import { fetchMovies, getGenres} from '../store/index.js'
import Slider from '../components/Slider.js'
import Search from '../components/Search.js'
import { RiContactsBookUploadLine } from 'react-icons/ri'
import { AppContext } from "../App.js";

export default function Netflix() {

  
  const { data, setData, isData, setIsData,setIsScrolled,isScrolled } = useContext(AppContext);

  const navigate=useNavigate()  
  const dispatch=useDispatch()

  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const movies=useSelector((state)=>state.netflix.movies)


 

  useEffect(()=>{
     dispatch(getGenres())
  },[])


  

  useEffect(()=>{
     if(genresLoaded)dispatch(fetchMovies({type:"all"}))
  },[genresLoaded])

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0?false:true)
    return()=>(window.onscroll=null);
  }



  const handleSubmitData = () => {
    console.log(data)
    setIsData(true) 
  };
   
  useEffect(()=>{
    if(data!=""){
      handleSubmitData()
    }else{
      setIsData(false)
    }     
   },[data])

  const afterSun=()=>{
    const payload = {
      id: 965150,
      movieType: "movie"
  };
    dispatch(getTrailer(payload))

    navigate('/player')

  }


  return (
    <Container>
        <Navbar isScrolled={isScrolled} setData={setData} setIsData={setIsData} data={data}/> 
        
         {
          isData?
          <Search data={data}/>:(
          <>         
          <div className="hero">
         <img src={bleu} alt="background" 
          className='background-image'
         />
         <div className="container">
          <div className="logo">
            <p>Blue</p>
          </div>
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={()=>afterSun()}><FaPlay/>Play</button> 
            <button className='flex j-center a-center'><AiOutlineInfoCircle/>More Info</button> 
          </div>
         </div>
        </div>
        <Slider movies={movies}/> 
        </>)
         }
      
      
      
    </Container>
  )
}


const Container=styled.div`
   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap');

   background-color:black;
   .hero{
    position:relative;
    .background-image{
      filter:brightness(40%);
     
    }
    img{
      height:100vh;
      width:100vw;
      object-fit:cover;
    }
    .container{
      position:absolute;
      bottom:5rem;
      left:1.5rem;
      .logo{
        margin-left:3rem;
        p{
          font-size:100px;
    
          font-family: 'Cormorant Garamond', serif;
          
        }
      }
      .buttons{
        margin:3rem;
        gap:2rem;
        button{
        font-size:1.2rem;
        gap:1rem;
        border-radius:0.2rem;
        padding:0.5rem;
        padding-left:2rem;
        padding-right:2.4rem;
        border:none;
        cursor:pointer;
        transition:0.3s ease-in-out;
        &:hover{
          opacity:0.8;
        }
        &:nth-of-type(2){
          background-color:rgba(109,109,110,0.7);
          color:white;
          svg{
            font-size:1.8rem;
          } 
        }

        }
      

      }
    }
   }


`