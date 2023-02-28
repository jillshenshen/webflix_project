import React, { useState ,useContext,useEffect} from 'react'
import styled from 'styled-components'
import Navbar from  '../components/Navbar.js'
import { AppContext } from "../App.js";
import Search from '../components/Search.js';
import sherlock from '../assets/sherlock.jpeg'

import Slider from '../components/Slider.js';
import { fetchMovies, getTvGenres} from '../store/index.js'
import { getTrailer} from '../store/index.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay } from 'react-icons/fa'
import {AiOutlineInfoCircle} from  'react-icons/ai'
import Genre from '../components/Genre.js';
import Skeleton from '../components/Skeleton.js';




export default function Movies() {
  const { data, setData, isData, setIsData,setIsScrolled,isScrolled ,setClickHome} = useContext(AppContext);
  const navigate=useNavigate()  
  const dispatch=useDispatch()
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded)
  const movies=useSelector((state)=>state.netflix.movies)
  const genres=useSelector((state)=>state.netflix.tvGenres)
  const [renderMovies, setRenderMovies] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [selectTv,setSelectTv]=useState("");
  const [tvLoading,setTvLoading]=useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFontSize(0.8);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  


  useEffect(()=>{
    dispatch(getTvGenres())
 },[])

 useEffect(()=>{
  if(genresLoaded){
    dispatch(fetchMovies({type:"tv"}))

    const timer = setTimeout(() => {
      setRenderMovies(true)
    }, 300);

    return () => {
      clearTimeout(timer);
    };
    
  }
  
},[genresLoaded])



window.onscroll=()=>{
  setIsScrolled(window.pageYOffset===0?false:true)
  return()=>(window.onscroll=null);
}

const handleSubmitData = () => {
  
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
    id: 19885,
    movieType: "tv"
};
  dispatch(getTrailer(payload))

  navigate('/player')

}

  return (
    <Container fontSize={fontSize}>
      <Navbar isScrolled={isScrolled} setData={setData} setIsData={setIsData} data={data}
       setClickHome={setClickHome}
       setSelectTv={setSelectTv}
      />

      {
        isData? 
        <Search data={data}/>:
        selectTv!=""?
        
        tvLoading?
        <Skeleton/>:

        <div className="selectList">
        <div className='selectTitle'>
          <h1 className='movieH1' onClick={()=>setSelectTv("")}>TV Shows &gt;</h1>
          <h1>{`${selectTv}`}</h1>
        </div>
   
        <Slider movies={movies}/>
        </div>

        :

        (
        <>
       
        <div className="hero">
         <img src={sherlock} alt="background" 
          className='background-image'
         />
         <div className="container">

          <div className="logo">
            <p>Sherlock</p>
          </div>
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={()=>afterSun()}><FaPlay/>Play</button> 
            <button className='flex j-center a-center'><AiOutlineInfoCircle/>More Info</button> 
          </div>
         </div>
        </div>
        <div className='genres-list'>
        <h1>TV Shows</h1>
        <Genre genres={genres} setSelectTv={setSelectTv} setTvLoading={setTvLoading} type="tv"/> 
        </div>
       
        {
          renderMovies&&
      <div className="data">
     
      
      <Slider movies={movies}/>
     
     
      </div>
        }
      
       


        </>
        )
      }
     
    
    </Container>
  )
}

const Container=styled.div`
  .hero{
   
   .background-image{
     filter:brightness(40%) ;
     
    
   }
   img{
     ${'' /* height:100vw; */}
     width:100%;
     height:100%;
     min-height:350px;
     object-fit:cover;
   }
   .container{
     position:absolute;
     top:20rem;
     left:1.5rem;

     .logo{
       margin-left:3rem;
       p{
         font-size: ${props => props.fontSize * 130}px;
         transition: font-size 1s ease-in-out;
         font-family: 'Cormorant Garamond', serif;
         
       }
     }
     .buttons{
       margin:3rem;
       gap:2rem;
       button{
       font-size:1.2rem;
       font-weight:600;
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
  .genres-list{
    h1{
      font-size:2.3rem; 
    }
   
    margin-left:3rem;
    display:flex;
    position:absolute;
    top:7rem;
  }

  .selectList{
    margin-top:7rem;
    .selectTitle{
      display:flex;
      margin-left:3rem;
      margin-bottom:3rem;
      .movieH1{
        cursor:pointer;
        font-size:1.5rem;
        margin-top:0.3rem;
        margin-right:1rem;
        color:grey;
        font-weight:300;
      }
      
    }
  }

  @media (max-width: 1200px) {
  .hero{
      .container{
        top:15rem;
    }
    }
    
  }

  @media (max-width: 900px) {
    .hero{
      .container{
        top:9rem;
        .logo{
        p{
          font-size: ${props => props.fontSize * 100}px;
        }
      }
      .buttons{
        margin:2rem 3rem;
        gap:1.5rem;
        button{
        font-size:1rem;
        font-weight:600;
        gap:0.8rem;
        padding:0.3rem;
        padding-left:1.6rem;
        padding-right:2rem;
      } 
      }
      
    }
   
    
  }

  @media (max-width: 650px) {
    .hero{
      .container{
        top:6rem;
        .logo{
          p{
          font-size: ${props => props.fontSize * 75}px;
        }
      }
      .buttons{
        margin:1.5rem 3rem;
        gap:1rem;
        button{
        font-size:0.8rem;
        font-weight:600;
        gap:0.5rem;
        border-radius:0.2rem;
        padding:0.2rem;
        padding-left:1.4rem;
        padding-right:1.5rem;
      } 
      }

      }

    }
   
    
  }

  @media (max-width: 450px) {
    .hero{
      .container{
    
        .logo{
          margin-left:2rem;
          p{
          font-size: ${props => props.fontSize * 65}px;
        }
      }
      .buttons{
        margin:2rem;
      
      }

  }

  
`
