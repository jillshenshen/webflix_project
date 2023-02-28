import React, { useState,useEffect,useContext } from 'react'
import Card from './Card'
import styled from 'styled-components'
import { useRef } from 'react';

import { AppContext } from "../App.js";


export default function CardSlider({data,title}) {
  const { clickHome } = useContext(AppContext);
   const [load,setLoad]=useState(false)
   const [showControls,setShowControls]=useState(false) 
   const [sliderIndex, setSliderIndex] = useState(0);
   const [numItems, setNumItems] = useState(4);
  
  const listRef=useRef();



  useEffect(()=>{

    const timer = setTimeout(() => {
      setLoad(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  

  },[]) 


   const handleDirection=(direction)=>{
      if(direction==="right") {
        if(sliderIndex+1>=numItems){
          setSliderIndex(0)
        }else{
          setSliderIndex(sliderIndex + 1)};
        }
        
      if(direction==="left") {
        if(sliderIndex-1<0){
          setSliderIndex(numItems-1)
        }else{
          setSliderIndex(sliderIndex - 1);
        }

      }
   } 

   useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
     
      if (width > 1200) {
        setNumItems(4);
       
      } else if (width > 900) {
        setNumItems(5);
      
      } else if (width > 600) {
        setNumItems(7);
     
      } else if (width > 450) {
        setNumItems(10);
       
      } else {
        setNumItems(20);
       
      }
   

   
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const items = [];

  for (let i = 0; i < numItems; i++) {
    items.push(<div className={`${i === sliderIndex ? 'progress-item active' : 'progress-item'}`} key={i}></div>);
  }

  if(sliderIndex>=numItems){
    setSliderIndex(numItems-1)
  }


 
 
  
   
  return (
    <Container 
      className='flex column '
      onMouseEnter={()=>setShowControls(true)}
      onMouseLeave={()=>setShowControls(false)}
      sliderIndex={sliderIndex}
      showControls={showControls}
    >   
       
       <div className="header">
            {clickHome?  
            <h3 className='title'>{load?title:''}</h3>
            : <h3 className='title'>{title}</h3>}
          
           
            <div className={`${!showControls?'none':'progress-bar' }`}>
            {items}
              
            </div>
       </div>

      <div className="container">
            <button className='handle left-handle'  onClick={()=>handleDirection('left')}>
                <div className={`${!showControls?'none':'text' }`} >&#8249;</div></button>

           <div className="slider">
      
           {data.map((movieData,index)=>{
            return <Card movieData={movieData} key={index} />         
          })}    
           </div>


           <button className='handle right-handle' onClick={()=>handleDirection('right')}>
                <div className={`${!showControls?'none':'text' }`} >&#8250;</div></button>
      </div>
       

    </Container>
  
  )
}

const Container=styled.div`
  z-index: ${props => props.showControls? "10" : ""};
  gap:1rem;
  position:relative;
  padding:1rem 0;
  box-sizing:border-box;
  margin-bottom:1.5rem;
.container{
 display: flex;

}
.slider{
    --items-per-screen:5;
    display: flex;
    flex-grow: 1;
    margin:0 .2rem;
    transform: translateX(calc(${props => props.sliderIndex} * -100%));
    transition:transform 550ms ease-in-out;
    
}


.handle{
    border: none;
    width:3rem;
    flex-grow: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    margin:0.2rem 0;
    cursor: pointer;
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.left-handle{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.right-handle{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.handle:hover{
    background-color: rgba(0, 0, 0, 0.2);
}

.text{
    transition: transform 150ms ease-in-out;
}

.handle:hover .text{
    transform: scale(1.1);
}
.none{
   visibility:hidden;
}

.header{
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    color: white;
   
}
.title{
    font-size: 2rem;
    margin: 0;
}

.progress-bar{
  display:flex;
  gap:.2rem;
  margin-top: 2rem;
}

.progress-item{
  
    flex:0 0 1rem;
    min-width: 1rem;
    height:.1rem;
    background-color: rgb(83, 83, 83);
}

.progress-item.active{
    background-color: white;
}
@media (max-width: 1200px) {
    .slider{
        --items-per-screen:4;
    }
    
    
  }



@media (max-width: 900px) {
    .slider{
        --items-per-screen:3;
    }
    
    
  }

  @media (max-width: 600px) {
    .title{
    font-size: 1.5rem;
    margin: 0;
}
.progress-bar{
 
  margin-top: 1rem;
}
    .slider{
        --items-per-screen:2;
    }
    
  }

  @media (max-width: 450px) {
    .header{
      padding:1rem 2rem;
      position:relative;
    }
    .progress-bar{
        position:absolute;
        bottom: 0rem;
       
    }
    .progress-item{
      flex:0 0 0.8rem;
      min-width: 0.8rem;
    }
    .slider{
        --items-per-screen:1;
    }
    
  }


`