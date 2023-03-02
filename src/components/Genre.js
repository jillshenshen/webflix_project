import React , { useState, useEffect, useRef }from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RiArrowDropDownFill} from 'react-icons/ri'
import { fetchDataByGenre } from '../store'

export default function Genre({genres,type,setSelectList,setSelectTv,setLoading,setTvLoading}) {
const [showTypeList, setShowTypeList] = useState(false);
const typeListRef = useRef(null);
const dispatch=useDispatch();



const handleClick = (e) => {
  dispatch(fetchDataByGenre({genre:e.target.value,type}));
  
    if(type==="movie"){
      setSelectList(e.target.textContent)
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    if(type==="tv"){
      setSelectTv(e.target.textContent)
      setTvLoading(true)
      setTimeout(() => {
        setTvLoading(false);
      }, 2000);
    }
  
  }

function toggleTypeList() {
    setShowTypeList(!showTypeList);
    
  } 


  useEffect(() => {
    function handleClickOutside(event) {
      // 如果點擊的是 type-list 元素本身，或者是 type-list 元素的子元素，就不做任何事情
      if (typeListRef.current && typeListRef.current.contains(event.target)) {
        return;
      }
      // 否則隱藏 type-list
      setShowTypeList(false);
    }

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [typeListRef]);  



  return (
    <Container>
        <div className="label"  
        ref={typeListRef}>
            <button className='type-btn'
            onClick={toggleTypeList}
    
            >Genres            

            <RiArrowDropDownFill/>
            </button>
            <div 
            className={`type-list ${showTypeList ? 'visible' : ''}`}>
            {genres.map((genre)=>{
              return(
            <div>
            <li key={genre.id} value={genre.id} onClick={(e) => handleClick(e)} >{genre.name}
            </li>
            </div>
          
        )
      })}
            </div>
        </div>
    </Container>
  )
}

const Container=styled.div`
  
  margin-left:2rem;
  margin-top:0.5rem;
  .type-btn{
    position:relative;
    color:white;
    background-color:black;
    border:1px solid white;
    cursor:pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    padding:0 0.3rem 0 0.7rem;
    &:hover{
        background-color: rgba(198, 198, 198, 0.241);
        }
        svg{
            font-size:2rem;
         
        }
    }

   .type-list{
   
    visibility:hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s;
    position:absolute;
    color:white;
    width:22rem;
    height:17rem;
    padding:1rem;
    background-color: black;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:0.6rem;
    li{
       list-style-type:none;
       cursor:pointer;
       &:hover{
        text-decoration: underline;

       }
    }
   } 
   .visible{
    visibility:visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s;
   }
  
   @media (max-width: 650px) {
    margin-left:0;
   }

`