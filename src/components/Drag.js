import React, { useState ,useContext,useRef,useEffect} from 'react'
import styled from 'styled-components'
import { AppContext } from "../App.js";
import { arrayUnion,doc,updateDoc ,deleteDoc,onSnapshot} from 'firebase/firestore'
import {db,app} from '../utils/firebase-config'
import 'firebase/compat/auth'

export default function Drag({toWatch,watching,watched,drop}) {
    const { email} = useContext(AppContext);
    const data=[
        {title:"To watch",items:[]},
        {title:"Watching",items:[]},
        {title:"Watched",items:[]},
        {title:"Drop",items:[]},
      ]  
  
    toWatch.forEach((item)=>{
        data[0].items.push(item)
    })  
    watching.forEach((item)=>{
        data[1].items.push(item)
    })  
    watched.forEach((item)=>{
        data[2].items.push(item)
    })  
    drop.forEach((item)=>{
        data[3].items.push(item)
    })  




       
    const [list,setList]=useState(data)
    const [dragging,setDragging]=useState(false)

    const dragItem=useRef()
    const dragNode=useRef()

    const D_start=(e,index)=>{
        console.log("drag start",index,e.target)
        dragItem.current=index
        dragNode.current=e.target
        dragNode.current.addEventListener('dragend',D_end)

      
        
        // 保留drag前style
         setTimeout(()=>{
           setDragging(true)
        },0)

    }


    const D_enter=(e,index)=>{
       const currentItem=dragItem.current
       // 確認enter進的位置不是目前的位置,才執行 
       if(e.target!==dragNode.current){
          setList((preList)=>{
            // Deep copy 
            let newList=JSON.parse(JSON.stringify(preList))
            // change order 
            let currentValue= newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]
            newList[index.grpI].items.splice(index.itemI,0,currentValue) 

            dragItem.current=index
            return newList
          })  

          setTimeout(()=>{
            saveDrop()
         },0)
        
         
       }
    
    }

    const D_end=()=>{
        setDragging(false)
        dragNode.current.removeEventListener('dragend',D_end)
        dragItem.current=null;
        dragNode.current=null;
    }

    const saveDrop=async()=>{
        const movieID=doc(db,'users',email)
        try{
            const toWatchArr=list[0].items
            const watchingArr=list[1].items
            const watchedArr=list[2].items
            const dropArr=list[3].items
            await updateDoc(movieID,{
                toWatch:toWatchArr,
                watching:watchingArr,
                watched:watchedArr,
                drop:dropArr,
            }) 
        }catch(error){
            console.log(error)
        }
    }

   

  const getStyles=(index)=>{
    const currentItem=dragItem.current
    if(currentItem.grpI===index.grpI&&currentItem.itemI===index.itemI){
        return "current dnd-item"
    }
    return "dnd-item"
  }







  return (
    <Container dragging={dragging}>
    <header className='drag-header'>
    <div className="drag-n-drop">
     {list.map((grp,grpI)=>(
         
          <div  key={grp.title} 
                className="dnd-group"
                onDragEnter={dragging&& !grp.items.length?(e)=>D_enter(e,{grpI,itemI:0}):null}                
           >
            <div className="group-title"><h2>{grp.title}</h2></div>
            {grp.items.map((item,itemI)=>(
               <div 
               draggable="true"
               onDragStart={(e)=>{D_start(e,{grpI,itemI})}}

               onDragEnter={(e)=>{D_enter(e,{grpI,itemI})}}
               
               className={dragging?getStyles({grpI,itemI}):"dnd-item"}

               key={item}
               >
                 <img src={`https://image.tmdb.org/t/p/w1280${item}`} alt="movie" 
              
                 /> 
               </div>
            ))}
          </div>
     ))}

    </div>

    </header>
   </Container>
  )
}

const Container=styled.div`

    width: 95%;
    height: 100%;
    background-color: rgba(41, 41, 41, 0.427);
    margin:0 auto;
    border-radius:5px;
    

.drag-header{
   
    min-width: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;

    .drag-n-drop{
    padding: 0.5rem;
    text-align: center;
    display: grid;
    gap: .5rem;
    width: 100%;
    height:100%;
 
    grid-template-columns: repeat(4,1fr);
    font-size: 15px;
    align-items: start;
    .dnd-group{
    background-color: black;
    padding:  0.5rem 0.5rem;
    border-radius: 5px;

  }

  }
    
  }


.dnd-item{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    img{
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius: 5px;          
    }
}




.group-title{
  margin-bottom: .5rem;
}

.dnd-item:not(:last-of-type){
    margin-bottom: .5rem;
}


.current{
    background-color:rgba(41, 41, 41, 0.427);
   
    img{
        visibility:hidden;
    }
  
}




`
