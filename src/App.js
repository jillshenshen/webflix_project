import React from "react";
import {Route,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Player from "./pages/Player"
import Netflix from "./pages/Netflix"



function App() {

    return (
      <div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />     
        <Route exact path="/signup" element={<Signup/>}/> 
        <Route exact path="/player" element={<Player/>}/> 
        <Route exact path="/" element={<Netflix/>}/>       
       </Routes>
      </div>
     
    );
  }
  
export default App;