import React, { useState ,useContext,useRef} from 'react'
import styled from 'styled-components'
import Navbar from  '../components/Navbar.js'
import { AppContext } from "../App.js";
import Search from '../components/Search.js';
import {doc,onSnapshot } from 'firebase/firestore'
import {db,app} from '../utils/firebase-config'
import 'firebase/compat/auth'
import { useEffect } from 'react';
import ListItem from '../components/ListItem'
import Drag from '../components/Drag'
import Info from '../components/Info.js'

export default function List() {
  const {
    data,
    setData,
    setIsData,
    isScrolled,
    setEmail,
    email,
    setClickHome,
    clickInfo,
    setClickInfo,
    showSearch,
    setShowSearch,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [myList, setMyList] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [watching, setWatching] = useState([]);
  const [watched, setWatched] = useState([]);
  const [drop, setDrop] = useState([]);
  const timeoutRef = useRef(null);
  const [clickDrag, setClickDrag] = useState(false);

  app.auth().onAuthStateChanged(function (user) {
   
    if (user) {
      setEmail(user.email);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        onSnapshot(doc(db, "users", email), (doc) => {
          setMyList(doc.data()?.savedShows);
          setToWatch(doc.data()?.toWatch);
          setWatching(doc.data()?.watching);
          setWatched(doc.data()?.watched);
          setDrop(doc.data()?.drop);
        });
      }
    }, 0); // 延遲 500 毫秒
    return () => clearTimeout(timer); // 在卸載時清除定時器
  }, [email]);

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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 850) {
        setClickDrag(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [clickDrag]);

  return (
    <Container isScrolled={isScrolled}>
      <Navbar
        isScrolled={isScrolled}
        setData={setData}
        setIsData={setIsData}
        data={data}
        setClickHome={setClickHome}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      {data ? (
        <>
          {clickInfo && <Info setClickInfo={setClickInfo} />}

          <Search/>
        </>
      ) : (
        <>
          <div className="buttons">
            <button onClick={() => setClickDrag(false)}>My List</button>
            <button onClick={() => setClickDrag(true)}>Viewing Status</button>
          </div>

          {clickDrag ? (
            <Drag
              toWatch={toWatch}
              watching={watching}
              watched={watched}
              drop={drop}
            />
          ) : (
            <>
              {clickInfo && <Info setClickInfo={setClickInfo} />}
              <div className="list-container">
                {myList.map((item) => {
                  return (
                    <div
                      className="list-item"
                      key={item.id}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <ListItem item={item} myList={myList} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
 .buttons{
  margin:6rem auto 1rem;
  width:90%;
  cursor:pointer;
  display: flex;
  flex-wrap: wrap;
  button{
      width:50%;
      z-index:99;
      position:relative;
      height:45px;
      pointer-events: auto;
      font-weight:600;
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

 @media (max-width: 850px) {
    .buttons{
      cursor:auto;
      button{
        margin:0 auto;
        &:nth-of-type(1){
          cursor:auto;
        }
        &:nth-of-type(2){
          display:none;
        }
      }
    }
  }
`;




