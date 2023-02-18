import React from 'react'
import CardSlider from './CardSlider'
import styled from 'styled-components'

export default function Slider({movies}) {

  const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to)
  }  



  return (
    <Container>
        <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)} style={{ zIndex: 6}}/>
        <CardSlider title="New Release" data={getMoviesFromRange(10,20)} style={{ zIndex: 5 }}/>
        <CardSlider title="BlockBuster Movies" data={getMoviesFromRange(20,30)} style={{ zIndex: 4 }}/>
        <CardSlider title="Popular On Webflix" data={getMoviesFromRange(30,40)} style={{ zIndex: 3 }} />
        <CardSlider title="Action Movies" data={getMoviesFromRange(40,50)} style={{ zIndex: 2 }}/>
        <CardSlider title="Epics" data={getMoviesFromRange(50,60)} style={{ zIndex: 1 }}/>
   
    </Container>
  )
}
const Container=styled.div`
 

`