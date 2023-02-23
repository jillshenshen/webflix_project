import React, { useState ,useContext,useRef} from 'react'
import styled from 'styled-components'
import Navbar from  '../components/Navbar.js'
import { AppContext } from "../App.js";
import Search from '../components/Search.js';
import {doc,updateDoc,onSnapshot,getDoc } from 'firebase/firestore'
import {db,app} from '../utils/firebase-config'
import 'firebase/compat/auth'
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'
import ListItem from '../components/ListItem'
import Drag from '../components/Drag'
import {AiOutlineDrag,AiOutlineUnorderedList} from 'react-icons/ai' 




export default function List() {
  const { data, setData, isData, setIsData,setIsScrolled,isScrolled ,email} = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [isHovered,setIsHovered]=useState(false)
  const [myList,setMyList]=useState([])
  
  const [toWatch,setToWatch]=useState([])  
  const [watching,setWatching]=useState([])  
  const [watched,setWatched]=useState([])  
  const [drop,setDrop]=useState([])  

  const timeoutRef = useRef(null);
  const youtube_v=useSelector((state)=>state.netflix.trailer)
  const [like,setLike]=useState(false)

  const [clickDrag,setClickDrag]=useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      if(email) {
        onSnapshot(doc(db, 'users', email), (doc) => {
          setMyList(doc.data()?.savedShows)  
          setToWatch(doc.data()?.toWatch)  
          setWatching(doc.data()?.watching)  
          setWatched(doc.data()?.watched)  
          setDrop(doc.data()?.drop)  
        })
      }
    }, 500); // 延遲 500 毫秒
    return () => clearTimeout(timer); // 在卸載時清除定時器
  }, []);

  




  // useEffect(()=>{ 
  //     let toWatchImg = myList.map(({image})=>{
  //       return image
  //     })
  //     console.log(toWatchImg)
    
  // },[myList])


 
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


 
  console.log(email)

  return (
    <Container isScrolled={isScrolled}>
      <Navbar isScrolled={isScrolled} setData={setData} setIsData={setIsData} data={data}/>
      {data?  <Search data={data}/>:
      ( <>  
      <div className='buttons'>
     
      <button onClick={()=>setClickDrag(false)}>My List</button> 
      <button onClick={()=>setClickDrag(true)}>Drag Board</button> 
      
  
      </div>
  
      {clickDrag?<Drag toWatch={toWatch} watching={watching} watched={watched} drop={drop}/>:

      <div className='list-container' >
      
      {myList.map((item)=>{
        return  <div className='list-item'
               
                  onMouseEnter={()=>
                  setIsHovered(true)
                
                  }
                  onMouseLeave={()=>setIsHovered(false)}
                >
                 <ListItem key={item.id} item={item} myList={myList}  />
       
        </div>
      })}
 
      </div>
      }


      </>)
      
      }
    
    
    </Container>
  )
}

const Container=styled.div`
  
  
 .buttons{
  margin:6rem auto 1rem;
  width:90%;
  cursor:pointer;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  button{
      ${'' /* z-index:${(props)=>(props.isScrolled?'99':'101')}; */}
      z-index:99;
      
      position:relative;
      height:45px;
      pointer-events: auto;
      font-weight:600;
      width:100%;
      font-size:1.2rem;
      gap:1rem;
      border-radius:0.2rem;
      border:none;
      cursor:pointer;
      transition:0.3s ease-in-out;
    &:hover{
          opacity:0.7;
          cursor:pointer;
        }
      
        &:nth-of-type(2){
          background-color:rgba(109,109,110,0.7);
          color:white;
        }
  }
 }


 .list-container{
  width:90vw;
  box-sizing: border-box;
  margin:2rem auto;
  padding-bottom:10rem;
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 30px;
  column-gap: 5px;
  position: relative;

 

  .list-item{
     
  img{
        width:100%;
        height:100%;
        border-radius:0.2rem;
        object-fit:cover;
      }

      

 }
  @media (max-width: 1700px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 990px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }


 }







`


