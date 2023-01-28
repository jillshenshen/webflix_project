import React from 'react'
import netflix from '../assets/netflix.webp' 
import styled from 'styled-components'
import '../index.css'

export default function Background() {


  return (
   
    <Container>      
        <img className="back" src={netflix} alt="background" />
    </Container>
  )
}


const Container = styled.div`
  width:100vw;
  height:100vh; 

img{
  width:100%;
  height:100%;
  object-fit:cover;
}
`


