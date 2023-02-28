import React from 'react'
import CardSlider from './CardSlider'
import styled from 'styled-components'

export default function Slider({movies}) {

  const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to)
  }  



  return (
    <Container>
        <CardSlider title="Trending Now" data={getMoviesFromRange(0,20)} />
        <CardSlider title="New Release" data={getMoviesFromRange(20,40)} />
        <CardSlider title="BlockBuster Movies" data={getMoviesFromRange(40,60)} />
        <CardSlider title="Popular On Webflix" data={getMoviesFromRange(60,80)}  />
        <CardSlider title="Action Movies" data={getMoviesFromRange(80,100)} />
        <CardSlider title="Epics" data={getMoviesFromRange(100,120)} />
     
   
    </Container>
  )
}
const Container=styled.div`


`