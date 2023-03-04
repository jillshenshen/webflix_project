import React from 'react'
import styled from 'styled-components'
import loading from '../assets/loading.gif'


export default function Loading() {
  return (
    <Container>
        <LoadingGif src={loading} alt="Loading..." />
    </Container>
  )
}



const Container = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  transition: opacity 1s ease-in-out;


`

const LoadingGif = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;