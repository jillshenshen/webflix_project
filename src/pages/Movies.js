import React, { useState ,useContext} from 'react'
import styled from 'styled-components'
import Navbar from  '../components/Navbar.js'
import { AppContext } from "../App.js";
import Search from '../components/Search.js';


export default function Movies() {
  const { data, setData, isData, setIsData,setIsScrolled,isScrolled } = useContext(AppContext);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} setData={setData} setIsData={setIsData} data={data}/>
      <Search data={data}/>
    
    </Container>
  )
}

const Container=styled.div`
`
