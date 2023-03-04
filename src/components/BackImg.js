import React,{useEffect,useState,useContext} from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { AppContext } from "../App.js";



export default function BackImg() {
  const [showLogo, setShowLogo] = useState(false);
  useEffect(() => {
    setShowLogo(true);
  }, []);

  return (
    <Container>
      <LogoImg showLogo={showLogo} src={logo} alt="logo" />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  transition: opacity 1s ease-in-out;
  display:flex;
  justify-content: center;
  align-items: center;

`;

const LogoImg = styled.img`
  
  position: absolute;
  opacity: ${(props) => (props.showLogo ? 1 : 0)};
  visibility:${(props) => (props.showLogo ? "visible" : "hidden")};
  width:100px;
  transition: opacity 2s ease-in-out;

  transform:${(props) => (props.showLogo ? "scale(3)" : "")};

`;

