import React ,{createContext,useState}from "react";
import {Route,Routes} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Player from "./pages/Player"
import Netflix from "./pages/Netflix"
import List from "./pages/List"
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";

export const AppContext = createContext();

function App() {
  const [isScrolled,setIsScrolled]=useState(false)
  const [data, setData] = useState("");
  const [isData,setIsData]=useState(false)
  const [clickHome,setClickHome]=useState(false)
  const [email,setEmail]=useState("")
  const [clickInfo,setClickInfo]=useState(false);

    return (
      <div>
       <AppContext.Provider value={{ data, setData, isData, setIsData,isScrolled,setIsScrolled,email,setEmail ,clickHome,setClickHome,clickInfo,setClickInfo}}>
       <Routes>
        <Route exact path="/login" element={<Login/>} />     
        <Route exact path="/signup" element={<Signup/>}/> 
        <Route exact path="/player" element={<Player/>}/> 
        <Route exact path="/" element={<Netflix/>}/>  
        <Route exact path="/myList" element={<List/>}/>   
        <Route exact path="/tv" element={<Tv/>}/>
        <Route exact path="/movies" element={<Movies/>}/> 
       </Routes>
       </AppContext.Provider>  
      </div>
     
    );
  }
  
export default App;