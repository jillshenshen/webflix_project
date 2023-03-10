import React ,{useState,useRef,useEffect,useContext}from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { AppContext } from "../App.js";
import { arrayUnion,doc,updateDoc } from 'firebase/firestore'
import {db} from '../utils/firebase-config'
import 'firebase/compat/auth'
import { homeInfo} from '../store/index.js'



export default function SearchItem({ item }) {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const youtube_v = useSelector((state) => state.netflix.trailer);
  const [like, setLike] = useState(false);
  const { email, setClickInfo } = useContext(AppContext);

  useEffect(() => {
    if (isHovered) {
      const payload = {
        id: item.id,
        movieType: item.type,
      };
      dispatch(getTrailer(payload));
    }
  }, [isHovered]);

  const timeoutRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        setShow(true);
      }, 300);
      const distanceFromTop = divRef.current.getBoundingClientRect().top;
      setTop(distanceFromTop);
      const distanceFromLeft = divRef.current.getBoundingClientRect().left;
      setLeft(distanceFromLeft);

      const distanceFromRight = divRef.current.getBoundingClientRect().right;
      const viewportWidth = window.innerWidth;
      const distance = viewportWidth - distanceFromRight;
      setRight(distance);
    } else {
      clearTimeout(timeoutRef.current);
      setShow(false);
    }
  }, [isHovered]);

  const saveShow = async () => {
    setLike(!like);
    const movieID = doc(db, "users", email);
    await updateDoc(movieID, {
      savedShows: arrayUnion({
        id: item.id,
        name: item.name,
        image: item.image,
        genres: item.genres,
        type: item.type,
      }),
      toWatch: arrayUnion(item.image),
    });
  };

  const getInfo = () => {
    const payload = {
      id: item.id,
      movieType: item.type,
    };
    dispatch(homeInfo(payload));

    setTimeout(() => {
      setClickInfo(true);
    }, 500);
  };

  const handleClick = () => {
    const payload = {
      id: item.id,
      movieType: item.type,
    };
    dispatch(getTrailer(payload));
    navigate("/player");
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={divRef}
      top={top}
      right={right}
      left={left}
      show={show}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${item.image}`}
        alt="movie"
      />

      {show && (
        <div className="hover">
          <div className="image-video-container">
            <div className="img-div">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.image}`}
                alt="movie"
              />
            </div>

            {youtube_v ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`}
                allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : (
              <h2>No video</h2>
            )}
          </div>
          <div className="info-container flex column">
            <h3 className="name">{item.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                {youtube_v && (
                  <IoPlayCircleSharp title="play" onClick={handleClick} />
                )}

                <p onClick={saveShow}>
                  {like ? (
                    <BsCheck />
                  ) : (
                    <AiOutlinePlus title="Add to my list" />
                  )}
                </p>
              </div>

              <div className="info">
                <BiChevronDown title="More info" onClick={() => getInfo()} />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {item.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index:${(props) => (props.show ? "99" : "")};
  transform: ${(props) => (props.show ? "scale(1.05)" : "")};
  transition: transform 0.3s ease-in-out;
  img{
    cursor:pointer;
  }
  .hover {
    z-index: 199;
    height: max-content;
    width: 120%;
    position: absolute;
    top: ${(props) => (props.top < 120 ? "0" : "-18vh")};
    left: -2vw;
  
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    
 
    .image-video-container {
      position: relative;
      height: 180px;
      
      .img-div{
        padding:0.5px;
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius:0.3rem;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        top: 0;
        z-index: 4;
        position: absolute;
        left: 0;
      }
      img {
        width:100%;
        height:100%;
        
      }
      video,
      iframe {
        width: 100%;
        height: 180px;
        left: 0;
        object-fit: cover;
        border-radius: 0.3rem;
        z-index: 5;
        position: absolute;
        border: none;
        border-radius:0.3rem;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
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
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }

  transition: all 0.2s ease-in-out;

  @media (max-width: 990px) {
    .hover{
      left: ${(props) =>
        props.right < 50 ? "-5vw" : props.left < 50 ? "0" : "-2vw"};
    
   
    }
    
  }
  @media (max-width: 680px) {
    .hover{
      left: ${(props) =>
        props.right < 60 ? "-8vw" : props.left < 50 ? "0" : "-2vw"};
    
   
    }
    
  }
  @media (max-width: 450px) {
    .hover{
      left: ${(props) =>
        props.right < 60 ? "-5vw" : props.left < 50 ? "0" : "-2vw"};
    }
  }
 
`;


