import React,{useContext,useState} from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppContext } from "../App.js";
import { app } from '../utils/firebase-config.js'
import 'firebase/compat/auth'
import Loading from '../components/Loading.js'
import BackImg from '../components/BackImg.js'


export default function Player() {
  const navigate = useNavigate();
  const youtube_v = useSelector((state) => state.netflix.trailer);
  const { data, setShowSearch, setClickBack } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showIframe, setShowIframe] = useState(true);



  // 影片載入完成後，隱藏loading
  function handleOnLoad() {
    setIsLoading(false); 
  }

  app.auth().onAuthStateChanged(function (user) {
   
    if (!user) {
      navigate("/login");
    
    }
  });

  //返回鍵設定
  const handleBack = () => {
    setShowIframe(false)
    // keep search bar text
    if (data) {
      setShowSearch(true);
    }
    setShowLogo(true);
    setClickBack(true);
    setTimeout(() => {
      window.history.back();
    }, 1200); 
  };




  return (
    <Container>
      {isLoading && <Loading />}
      {showLogo && <BackImg />}
      {showIframe&&
        <div className={`player ${!isLoading ? "show" : ""}`}>
        <div className="back">
          <BsArrowLeft onClick={() => handleBack()} />
        </div>
        <iframe
          src={`https://www.youtube.com/embed/${youtube_v}?accelerometer=1&autoplay=1&mute=1`}
          allow="accelerometer;autoplay;mute;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={handleOnLoad}
     
        ></iframe>
      </div>
      
      }
    
    </Container>
  );
}

const Container = styled.div`
   .player{
    width:100vw;
    height:100vh;
    opacity: 0;
    visibility:hidden;
    transition: opacity 1s ease;
    .back{
        position:absolute;
        padding-top:5rem;
        padding-left:1rem;
        z-index:1;
        svg{
            font-size:2.5rem;
            cursor:pointer;
        }
     }
   
   }
   .player.show {
      opacity: 1; 
      visibility:visible; 
   }
 
   video,iframe{
    width: 100%;
    height: 100%;
    object-fit:cover;
    border:none;
   }
`;


