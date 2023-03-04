import React,{useState,useEffect} from 'react'
import styled from 'styled-components'



export default function Skeleton() {
  const [itemDiv, setItemDiv] = useState(5);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width > 1200) {
        setItemDiv(5);
      } else if (width > 900) {
        setItemDiv(4);
      } else if (width > 600) {
        setItemDiv(3);
      } else if (width > 450) {
        setItemDiv(2);
      } else {
        setItemDiv(1);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [];

  for (let i = 0; i < itemDiv; i++) {
    items.push(<div key={i} className="item skeleton"></div>);
  }

  return (
    <Container itemDiv={itemDiv}>
      <div className="title skeleton"></div>
      <div className="slider">{items}</div>
    </Container>
  );
}

const Container = styled.div`
  margin-top:8rem;
  .title{
    width:15rem;
    height:2rem;
    background-color:grey;
    margin-left:3rem;
    margin-bottom:2rem;
  }
  .slider{
    padding:0 1rem;
    width:100%;
    height:100%;
  
    display:grid;
    grid-template-columns: repeat(${(props) => props.itemDiv}, 1fr);
    column-gap:5px;
  }
  .item{
  border-radius:0.3rem;
  aspect-ratio: 16/9;
  background-color: grey;
  position:relative;

  }

  .skeleton{
    opacity:0.7;
    animation:loading 1s linear infinite alternate;
  }

  @keyframes loading{
     0%{
        background-color:HSL(0, 0%, 15%);
     }
     100%{
        background-color:HSL(0,0%,50%);
     }
  }


`;




