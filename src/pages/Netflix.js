import React, { useState ,useContext,useEffect} from 'react'
import Navbar from  '../components/Navbar.js'
import Interstellar from '../assets/Interstellar.jpeg'
import { FaPlay } from 'react-icons/fa'
import {AiOutlineInfoCircle} from  'react-icons/ai'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTrailer} from '../store/index.js'
import { homeInfo} from '../store/index.js'
import { fetchMovies, getGenres} from '../store/index.js'
import Slider from '../components/Slider.js'
import Search from '../components/Search.js'
import { AppContext } from "../App.js";
import Info from '../components/Info.js'
import Loading from '../components/Loading.js'


export default function Netflix() {
  const {
    data,
    setData,
    isData,
    setIsData,
    setIsScrolled,
    isScrolled,
    clickInfo,
    setClickInfo,
    showSearch,
    setShowSearch,
    clickBack,
    setClickBack,
    setShowLogo,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const [fontSize, setFontSize] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFontSize(0.8);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleSubmitData = () => {
    setIsData(true);
  };

  useEffect(() => {
    if (data != "") {
      handleSubmitData();
    } else {
      setIsData(false);
    }
  }, [data]);

  const afterSun = () => {
    const payload = {
      id: 157336,
      movieType: "movie",
    };
    dispatch(getTrailer(payload));
    setTimeout(() => {
      navigate("/player");
    }, 200);
  };

  const getInfo = () => {
    const payload = {
      id: 157336,
      movieType: "movie",
    };
    dispatch(homeInfo(payload));
    setClickInfo(true);
  };

  function handleImageLoad() {
    setImageLoaded(true);
    setClickBack(false);
  }

  return (
    <Container fontSize={fontSize}>
      {!imageLoaded && !isData && !clickBack && <Loading />}

      <Navbar
        isScrolled={isScrolled}
        setData={setData}
        setIsData={setIsData}
        data={data}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      {isData ? (
        <>
          {clickInfo && <Info setClickInfo={setClickInfo} />}

          <Search data={data} />
        </>
      ) : (
        <>
          {clickInfo && <Info setClickInfo={setClickInfo} />}
          <div className="hero">
            <img
              src={Interstellar}
              alt="background"
              className="background-image"
              onLoad={handleImageLoad}
            />
            <div className="container">
              <div className="logo">
                <p>Interstellar</p>
              </div>
              <div className="buttons flex">
                <button
                  className="flex j-center a-center"
                  onClick={() => afterSun()}
                >
                  <FaPlay />
                  Play
                </button>
                <button
                  className="flex j-center a-center"
                  onClick={() => getInfo()}
                >
                  <AiOutlineInfoCircle />
                  More Info
                </button>
              </div>
            </div>
          </div>
          <Slider movies={movies} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap');
   z-index:7;  
   background-color:black;
   position:relative;
   .hero{
   
    .background-image{
      filter:brightness(60%) ;
      
     
    }
    img{
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
          font-size: ${(props) => props.fontSize * 130}px;
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
          font-size: ${(props) => props.fontSize * 100}px;
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
          font-size: ${(props) => props.fontSize * 75}px;
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
          font-size: ${(props) => props.fontSize * 65}px;
        }
      }
      .buttons{
        margin:2rem;
      
      }

  }


`;