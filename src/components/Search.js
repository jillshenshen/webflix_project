import React from 'react'
import { useSelector} from 'react-redux'
import styled from 'styled-components'
import SearchItem from './SearchItem.js'




export default function Search() {
  const searchArray = useSelector((state) => state.netflix.search);

  return (
    <Container>
      {searchArray.length !== 0 &&
        searchArray.map((item, index) => {
          return (
            <div className="img-div" key={index}>
              <SearchItem item={item} />
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`

  width:90vw;
  box-sizing: border-box;
  margin:7rem auto ;
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 30px;
  column-gap: 5px;
  padding-bottom:7rem;
  .img-div{
   
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

`;


