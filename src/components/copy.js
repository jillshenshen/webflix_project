import React from 'react'
import { useState ,useRef,useContext} from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'
import { arrayUnion,doc,updateDoc } from 'firebase/firestore'
import {db,app} from '../utils/firebase-config'
import 'firebase/compat/auth'
import { AppContext } from "../App.js";

export default function Copy({movieData}) {
  const [show, setShow] = useState(false);
  const [isHovered,setIsHovered]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const youtube_v=useSelector((state)=>state.netflix.trailer)

  const [like,setLike]=useState(false)
  const [saved,setSaved]=useState(false)
 

  const { email,setEmail } = useContext(AppContext);
  
  useEffect(()=>{
    if(isHovered){
      const payload = {
        id: movieData.id,
        movieType: movieData.type
    };
        dispatch(getTrailer(payload))
    }   
  },[isHovered])
  
 const timeoutRef = useRef(null);
 useEffect(() => {
   if (isHovered) {
     timeoutRef.current = setTimeout(() => {
       setShow(true);
     }, 300);
   } else {
     clearTimeout(timeoutRef.current);
     setShow(false);
   }
 }, [isHovered]);



app.auth().onAuthStateChanged(function(user) {
 
  if(user){
    setEmail(user.email)
  }
 
})


 
 const saveShow = async() => {
    
      setLike(!like) 
      const movieID=doc(db,'users',email)
       await updateDoc(movieID,{
         savedShows:arrayUnion({
          id:movieData.id,
          name: movieData.name,
          image:movieData.image,
          genres:movieData.genres,
          type:movieData.type
         }),
         toWatch:arrayUnion(
          movieData.image
         )
      
        }) 
 }






  return (
    <Container
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
  
    className={show ? 'showHover' : ''}
    >

     <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
      /> 
  

     {/* <div className='hover'>
               <div className="image-video-container">
               <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
               onClick={()=>navigate('/player')}
                /> 

                {show&&    <iframe src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`} allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}
            
             
               </div>
               <div className="info-container flex column">
                   <h3 className='name'>{movieData.name}</h3>
                   <div className="icons flex j-between">
                      <div className="controls flex">
                         <IoPlayCircleSharp title="play" onClick={()=>navigate('/player')}/>

                         <p onClick={saveShow}>
                         {like?<BsCheck/>:  <AiOutlinePlus title="Add to my list" />}
                         </p>
                       
                       
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

            </div> */}
   



     {show&&(
            <div className='hover'

            >
               <div className="image-video-container">
               <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
               onClick={()=>navigate('/player')}
                /> 
                <iframe src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`} allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             
               </div>
               <div className="info-container flex column">
                   <h3 className='name'>{movieData.name}</h3>
                   <div className="icons flex j-between">
                      <div className="controls flex">
                         <IoPlayCircleSharp title="play" onClick={()=>navigate('/player')}/>

                         <p onClick={saveShow}>
                         {like?<BsCheck/>:  <AiOutlinePlus title="Add to my list" />}
                         </p>
                       
                       
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

            </div>
      
            )}
    </Container>
  )
}

const Container=styled.div`
   max-width:230px;
   width:230px;
   height:100%;
   position:relative;
   transition: transform 100ms ease-out, border-radius 200ms ease-out;
   z-index: 1;
   
    img{
    width:100%;
    height:100%;
    object-fit:cover;
    }

   


   .hover{
    ${'' /* display: none; */}
    z-index:9999999;
    height:max-content;
    width:15rem;
    position:absolute;
    ${'' /* top:-18vh;
    left:0; */}
    top:-18vh;
    left:-3vw;
    border-radius:0.3rem;
    box-shadow:rgba(0,0,0,0.75) 0px 3px 10px;
    background-color:#181818;
    transition:2s ease-in-out;
    
 

    .image-video-container{
        position:relative;
        height:120px;
        img{
            width:100%;
            height:120px;
            object-fit:cover;
            top:0;
            z-index:4;
            position:absolute;
        }
        video,iframe{
            width:100%;
            height:120px;
            object-fit:cover;
            border-radius:0.3rem;
            z-index:5;
            position:absolute;
        }
    }
    .info-container{
        padding:0.6rem;
        gap:0.2rem;
        h3{
          font-size:1rem;  
        }

    }
    .icons{
        .controls{
            display:flex;
            gap:0.6rem;
        }
        svg{
            font-size:1.2rem;
            cursor:pointer;
            transition:0.3s ease-in-out;
            &:hover{
                color:#b8b8b8;
            } 
        }
    }
    .genres{
        ul{
            gap:0.6rem;
            li{
                padding-right:0.3rem;
                &:first-of-type{
                    list-style-type:none;
                }
            }
        }
    }
   }



   &.showHover{
    position:relative;
    border-radius: 10px;

   
    box-shadow: 0 0 2px #000a;
    z-index:999999;
    img{
    transform: scale(1.5);
    top:0;
    z-index:4;
    position:absolute;
    }
    ${'' /* .hover{
    
    display: block;
    object-fit:cover;
    border-radius:0.3rem;
    position:absolute;
   
     
  
    } */}
   }

   transition: all 0.3s ease-in-out;

`