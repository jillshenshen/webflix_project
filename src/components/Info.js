import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {AiFillCloseCircle,AiOutlineHome,AiFillStar} from 'react-icons/ai'


export default function Info({ setClickInfo }) {
  const info = useSelector((state) => state.netflix.homeInfo);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);


  const handleClick = (i) => {
    window.open(i.homepage, "_blank");
  };

  //使用mousedown監聽外部點擊事件
  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && infoRef.current.contains(event.target)) {
        return;
      }
      setClickInfo(false);
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [infoRef]);

  return (
    <Container showInfo={showInfo}>
      <div className="info-container" ref={infoRef}>
        <div className="close">
          <AiFillCloseCircle
            onClick={() => {
              setClickInfo(false);
            }}
          />
        </div>

        {info.map((i, index) => {
          return (
            <div key={index}>
              <div className="img-div">
                <img src={`https://image.tmdb.org/t/p/w780${i.image}`} alt="" />
              </div>

              <div className="info-div">
                <h1>{i.title}</h1>

                <div className="detail">
                  {i.homepage ? (
                    <div
                      className="home"
                      onClick={() => {
                        handleClick(i);
                      }}
                    >
                      <AiOutlineHome />
                    </div>
                  ) : (
                    ""
                  )}
                  {i.vote != "0.0" ? (
                    <div className="star">
                      <AiFillStar />
                      <span>{i.vote.toFixed(1)}/10</span>
                    </div>
                  ) : (
                    ""
                  )}

                  <span>{i.date}</span>
                  <span>{i.runtime ? i.runtime + "m" : ""}</span>

                  <h4>
                    Genres:
                    {i.genres.map((g, index) => {
                      return <span key={index}>{g.name}</span>;
                    })}
                  </h4>
                </div>

                <p>{i.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@1,300&display=swap');
 background-color: rgba(0, 0, 0, 0.6);
 width: 100%; 
 height:100vh;
 position: fixed;

 top: 0;
 z-index:101;
 opacity: ${(props) => (props.showInfo ? "1" : "0")};
 visibility: ${(props) => (props.showInfo ? "visible" : "hidden")};
 transition: opacity 1s ease-in-out;
 border-radius:0.3rem;


 .info-container{
    overflow:auto;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%, -10px);
    background-color:#181818;
    width:50%;
    margin:auto;
    max-height: 80vh;
    border-radius:0.3rem;
    .close{
      position:absolute;
      top:1rem;
      right:1rem;
      z-index:1; 
        svg{
        cursor:pointer; 
        font-size:2rem;
       
        color:#181818;
    }
    }
    .close:hover{
      svg{
        color:#f34242;
      }
    }
    

    .img-div{
        width:100%;
        border-top-right-radius: 0.3rem;
        border-top-left-radius: 0.3rem;
        position:relative;

      
        img{
            width:100%;
            height:100%:
            object-fit:cover;
            border-top-right-radius: 0.3rem;
            border-top-left-radius: 0.3rem;
        }
       

    }

    .info-div{
      padding:0.3rem 1rem;
      p{
        color:#999999;
        font-family: 'Source Sans Pro', sans-serif;
      }
    
      .detail{
        margin-top:0.5rem;
        margin-bottom:0.5rem;
        display:flex;
        flex-wrap:wrap;
        align-items: center;
        gap:1rem;
        h4{
          font-weight:300;
          span{
            margin-right:0.3rem;
          }
        }
      }
    }

    .home{
      cursor:pointer;
      svg{
        color:#f34242; 
        font-size:1.5rem;
      }
      }
      .home:hover{
        svg{
          opacity:0.7;
        }
      }

    .star{
      display:flex;
      justify-content: center;
      align-items: center;
      svg{
        color:#F5C518;
        font-size:1.5rem;
      }
    }
   

 }

 .info-container::-webkit-scrollbar {
  display: none;

}



 @media (max-width: 850px) {
  .info-container{
    width:80%;
  }


 }

 @media (max-width: 450px) {
  .info-container{
    width:90%;
  }

 }

 
`;


