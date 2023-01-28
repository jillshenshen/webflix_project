import React, { useState } from 'react'
import Navbar from  '../components/Navbar.js'
import home from '../assets/home.jpg'
import peaky from '../assets/peaky.png'
import { FaPlay } from 'react-icons/fa'
import {AiOutlineInfoCircle} from  'react-icons/ai'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMovies, getGenres ,getTrailer} from '../store/index.js'
import Slider from '../components/Slider.js'
import { RiContactsBookUploadLine } from 'react-icons/ri'

export default function Netflix() {
  const [isScrolled,setIsScrolled]=useState(false)
  const navigate=useNavigate()  
  const dispatch=useDispatch()
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const movies=useSelector((state)=>state.netflix.movies)
 

  useEffect(()=>{
     dispatch(getGenres())
  },[])



  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"all"}))
  })

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0?false:true)
    return()=>(window.onscroll=null);
  }

  


  return (
    <Container>
        <Navbar isScrolled={isScrolled}/> 
        <div className="hero">
         <img src={home} alt="background" 
          className='background-image'
         />
         <div className="container">
          <div className="logo">
            <img src={peaky} alt="movie logo" />
          </div>
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={()=>navigate('/player')}><FaPlay/>Play</button> 
            <button className='flex j-center a-center'><AiOutlineInfoCircle/>More Info</button> 
          </div>
         </div>
        </div>
        <Slider movies={movies}/>
    </Container>
  )
}


const Container=styled.div`
   background-color:black;
   .hero{
    position:relative;
    .background-image{
      filter:brightness(60%);
     
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
        img{
          width:60%;
          height:60%;
          margin-left:2rem;
          object-fit:cover;
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