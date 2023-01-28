import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {RiThumbUpFill,RiThumbDownFill} from 'react-icons/ri'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'


export default function Card({movieData,isLiked=false}) {
  const [isHovered,setIsHovered]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const youtube_v=useSelector((state)=>state.netflix.trailer)
  
  useEffect(()=>{
    if(isHovered){
        dispatch(getTrailer(movieData.id))
    }   
 },[isHovered])
  

  return (
    <Container
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
      />
      {
        isHovered&&(
            <div className='hover'>
               <div className="image-video-container">
               <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
               onClick={()=>navigate('/player')}
                /> 
                <iframe src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`} allow="accelerometer;autoplay;mute;clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                {/* <video src={`https://www.youtube.com/watch?v=${youtube_v}`}   autoPlay loop muted onClick={()=>navigate('/player')}/> */}
               </div>
               <div className="info-container flex column">
                   <h3 className='name' onClick={()=>navigate('/player')}>{movieData.name}</h3>
                   <div className="icons flex j-between">
                      <div className="controls flex">
                         <IoPlayCircleSharp title="play" onClick={()=>navigate('/player')}/>
                         <AiOutlinePlus title="Add to my list"/>
                      </div>

                      <div className="info">
                        <BiChevronDown title="More info"/>
                      </div>
                   </div>
                   <div className="genres flex">
                    <ul className='flex'>
                       {movieData.genres.map((genre)=>(
                        <li key={genre}>{genre}</li>
                       ))} 
                    </ul>
                   </div>
               </div>

            </div>)
      }
    
    </Container>
  )
}

const Container=styled.div`
   max-width:230px;
   width:230px;
   
   height:100%;
   cursor:pointer;
   position:relative;
   img{
    border-radius:0.2rem;
    width:100%;
    height:100%;
    z-index:10;
   }
   .hover{
    z-index:101;
    height:max-content;
    width:20rem;
    position:absolute;
    top:-18vh;
    left:0;
    border-radius:0.3rem;
    box-shadow:rgba(0,0,0,0.75) 0px 3px 10px;
    background-color:#181818;
    transition:0.2s ease-in-out;

    .image-video-container{
        position:relative;
        height:180px;
        img{
            width:100%;
            height:180px;
            object-fit:cover;
            top:0;
            z-index:4;
            position:absolute;
        }
        video,iframe{
            width:100%;
            height:180px;
            object-fit:cover;
            border-radius:0.3rem;
            z-index:5;
            position:absolute;
        }
    }
    .info-container{
        padding:1rem;
        gap:0.5rem;

    }
    .icons{
        .controls{
            display:flex;
            gap:1rem;
        }
        svg{
            font-size:2rem;
            cursor:pointer;
            transition:0.3s ease-in-out;
            &:hover{
                color:#b8b8b8;
            } 
        }
    }
    .genres{
        ul{
            gap:1rem;
            li{
                padding-right:0.7rem;
                &:first-of-type{
                    list-style-type:none;
                }
            }
        }
    }
   }

`