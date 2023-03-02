import { configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY,TMDB_BASE_URL } from "../utils/constants";


const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
    tvGenres:[],
    trailer:"",
    search:[],
    homeInfo:[]
    
}


export const getSearch=createAsyncThunk('netflix/search',async(input,thunkApi)=>{
    const {netflix:{genres}}=thunkApi.getState();
    const {data:{results}}=await axios.get(`${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${input}`)
    const searchArray=[]
    results.forEach((result)=>{
        const movieGenres=[];
        result.genre_ids.forEach((genre)=>{
        const name=genres.find(({id})=>id===genre)
         if(name) movieGenres.push(name.name);
      }) 


       if(result.backdrop_path){
          searchArray.push({
              id:result.id,
              name:result.original_name?result.original_name:result.original_title,
              image:result.backdrop_path,
              genres:movieGenres.slice(0,3),
              type:result.media_type
  
          })
          
       }
  
    })
    
    return searchArray
  
  })

export const homeInfo=createAsyncThunk('netflix/homeInfo',async(payload)=>{
 
   const {data:{overview,original_title,original_name,backdrop_path,vote_average,first_air_date,release_date,runtime,homepage,genres}}=await axios.get(`${TMDB_BASE_URL}/${payload.movieType}/${payload.id}?api_key=${API_KEY}`)
   const infoArray=[]
   infoArray.push(
    {
       info:overview,
       title:original_name?original_name:original_title,
       image:backdrop_path,
       vote:vote_average,
       date:release_date?release_date:first_air_date,
       runtime:runtime,
       homepage:homepage,
       genres:genres,
    })

   return infoArray   

})  



export const getTrailer=createAsyncThunk('netflix/trailer',async(payload)=>{  
 
    const {data:{results}}=await axios.get(`${TMDB_BASE_URL}/${payload.movieType}/${payload.id}/videos?api_key=${API_KEY}`)

    const youtube_v=  results[0].key
    return youtube_v
 
    
})


export const getGenres=createAsyncThunk('netflix/genres',async()=>{

    const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      
    return genres;
})


export const getTvGenres=createAsyncThunk('netflix/tvGenres',async()=>{

    const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/tv/list?api_key=${API_KEY}`)
      
    return genres;
})


const createArrayFromRawData=(array,movieArray,genres,type)=>{
   array.forEach((movie)=>{
     
      const movieGenres=[];
      movie.genre_ids.forEach((genre)=>{
        const name=genres.find(({id})=>id===genre)
         if(name) movieGenres.push(name.name);
      })
      if(movie.backdrop_path){
        movieArray.push({
            id:movie.id,
            name:movie.original_name?movie.original_name:movie.original_title,
            image:movie.backdrop_path,
            genres:movieGenres.slice(0,3),
            type:movie.media_type?movie.media_type:type
        })
      }
   })
}



const getRawData=async(api,genres,paging,type)=>{
    const movieArray=[];
    for(let i=1;movieArray.length<120&&i<20;i++){
        const {data:{results}}=await axios.get(`${api}${paging?`&page=${i}`:""}`)

        createArrayFromRawData(results,movieArray,genres,type);
       
    }
    return movieArray;
}

export const fetchMovies=createAsyncThunk('netflix/trending',async({type},thunkApi)=>{
   const {netflix:{tvGenres}}=thunkApi.getState();
   const {netflix:{genres}}=thunkApi.getState();
   return  getRawData(
    `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
    genres,
    true
   )
   
})

export const fetchDataByGenre=createAsyncThunk('netflix/moviesByGenre',async({genre,type},thunkApi)=>{
   
    const {netflix:{genres}}=thunkApi.getState();
  
    return  getRawData(
     `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
     genres,
     true,
     type,
     
    )
    
 })

 






const NetflixSlice=createSlice({
    name:"Netflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
            state.genres=action.payload;
            state.genresLoaded=true;
        });

        builder.addCase(getTvGenres.fulfilled,(state,action)=>{
            state.tvGenres=action.payload;
            state.genresLoaded=true;
            
        });

        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
           
        });
        builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
            state.movies=action.payload;
           
        });

        builder.addCase(getTrailer.fulfilled,(state,action)=>{
            state.trailer=action.payload;  
        }).addCase(getTrailer.rejected, (state, action) => {
            state.trailer = null;
          });
          
        builder.addCase(getSearch.fulfilled,(state,action)=>{
            state.search=action.payload;
           
        });
        builder.addCase(homeInfo.fulfilled,(state,action)=>{
            state.homeInfo=action.payload;
           
        });

    }
})

export const store=configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    }
})