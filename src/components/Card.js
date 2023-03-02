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
import { homeInfo} from '../store/index.js'


export default function Card({movieData}) {
  const [show, setShow] = useState(false);
  const [isHovered,setIsHovered]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const youtube_v=useSelector((state)=>state.netflix.trailer)
  const [top,setTop]=useState(0)
  const [left,setLeft]=useState(0)
  const [right,setRight]=useState(0)
  const [like,setLike]=useState(false)
  const { email,setEmail,clickInfo,setClickInfo } = useContext(AppContext);
  
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
 const divRef = useRef(null);


 useEffect(() => {
   if (isHovered) {
     timeoutRef.current = setTimeout(() => {
       setShow(true);
      
     }, 500);
     const distanceFromTop = divRef.current.getBoundingClientRect().top;
     setTop(distanceFromTop);
     const distanceFromLeft=divRef.current.getBoundingClientRect().left;
     setLeft(distanceFromLeft)
   
    
     const distanceFromRight=divRef.current.getBoundingClientRect().right;
     const viewportWidth = window.innerWidth;
     const distance = viewportWidth - distanceFromRight;
     setRight(distance)
   
     


   } else {
     clearTimeout(timeoutRef.current);
     setShow(false);
    
   }
 }, [isHovered]);



// let email
app.auth().onAuthStateChanged(function(user) {
  //這裡會印出User的資訊
  // email=user.email
  setEmail(user.email)
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

 const getInfo=()=>{
   
  const payload = {
    id: movieData.id,
    movieType: movieData.type
};
 dispatch(homeInfo(payload)) 

 setTimeout(() => {
    setClickInfo(true);
  }, 500);


}




  return (
    <Container
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    show={show}
    clickInfo={clickInfo}
    top={top}
    right={right}
    left={left}
    ref={divRef}
   
    >
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
      />
      {
        show &&(
            <div className='hover'>
               <div className="image-video-container">
               <div className='img-div'> <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" 
               onClick={()=>navigate('/player')}
                /> </div>
               
                
                {youtube_v?
                  <iframe src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`} allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>:
                  <h2>No video</h2>
                }
                
             
               </div>
               <div className="info-container flex column">
                   <h3 className='name'>{movieData.name}</h3>
                   <div className="icons flex j-between">
                      <div className="controls flex">
                      {youtube_v && <IoPlayCircleSharp title="play" onClick={() => navigate("/player")} />}

                         <p onClick={saveShow}>
                         {like?<BsCheck/>:  <AiOutlinePlus title="Add to my list" />}
                         </p>
                       
                       
                      </div>

                      <div className="info">
                        <BiChevronDown title="More info"  onClick={()=>getInfo()}/>
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
  --items-per-screen:5;
  flex-basis: 0 0 calc(100% / var(--items-per-screen)); 
  min-width: calc(100% / var(--items-per-screen));
  aspect-ratio: 16/9;
  padding:0.2rem;
  border-radius: 0.5rem;
   cursor:pointer;
   position:relative;
   z-index:${(props)=>(props.show?"99":"")};
   transform: ${(props)=>(props.show?"scale(1.05)":"")};
  
  
   img{
    border-radius:0.2rem;
    width:100%;
    height:100%;
    object-fit:cover;
    z-index:10;
   }
   .hover{
    z-index:199;
    height:max-content;
    width:130%;
    position:absolute;
    top:-18vh;
    left:${(props)=>(props.left<30 ? '0.2vw' : (props.right < 30 ? '-6vw' : '-2.5vw'))};
    border-radius:0.3rem;
    box-shadow:rgba(0,0,0,0.75) 0px 3px 10px;
    background-color:#181818;
  
    
 
    .image-video-container{
        position:relative;
        height:180px;
     
        .img-div{
            padding:0.5px;
            width:100%;
            height:180px;
            object-fit:cover;
            border-radius:0.3rem;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            top:0;
            z-index:4;
            position:absolute;
           
        }
        img{
         
            width:100%;
            height:100%;
           
        }
        video,iframe{
            width:100%;
            height:180px;
            object-fit:cover;
            border-radius:0.3rem;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;

            z-index:5;
            position:absolute;
            border: none;
        }
        h2{
          position:absolute;
          z-index:5;
          right:1rem;
          bottom:1rem;
          background-color:rgba(0,0,0,0.7);
          padding:0.3rem 0.6rem;
         
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
   transition: all 0.2s ease-in-out;
  

   @media (max-width: 1200px) {
    
        --items-per-screen:4;
        .hover{
          left:${(props)=>(props.left<30 ? '0.25vw' : (props.right < 30 ? '-7.5vw' : '-4vw'))};
        }
    
    
    
  }



@media (max-width: 900px) {
    
        --items-per-screen:3;
        .hover{
          left:${(props)=>(props.left<30 ? '0.33vw' : (props.right < 30 ? '-9.8vw' : '-4.5vw'))};
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
    
    --items-per-screen:2;
    .hover{
          top:-16vh;
          left:${(props)=>(props.left<30 ? '0.4vw' : '-14.3vw')};
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
    .hover{
      width:97%;
      left:1.3vw;
    }
        --items-per-screen:1;
    
    
  }



`