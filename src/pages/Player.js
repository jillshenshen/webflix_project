import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



export default function Player() {
  const navigate=useNavigate()  
  const youtube_v=useSelector((state)=>state.netflix.trailer)
  return (
    <Container>
       <div className="player">
        <div className="back">
            <BsArrowLeft onClick={()=> navigate(-1)}/>
        </div>
        <iframe src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`} allow="accelerometer;autoplay;mute;clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
       </div>

    </Container>
  )
}

const Container=styled.div`
   .player{
    width:100vw;
    height:100vh;
    .back{
        position:absolute;
        padding-top:3.5rem;
        padding-left:1rem;
        z-index:1;
        svg{
            font-size:2.5rem;
            cursor:pointer;
        }
    }
   
   }
   video,iframe{
    width: 100%;
    height: 100%;
    object-fit:cover;
    border:none;
   }
`
