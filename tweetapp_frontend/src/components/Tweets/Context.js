import React, { useContext,useEffect, useReducer } from 'react'
import reducer from './Reducer';
const initalState={
isLoading:true,
lastPage: true,
pageNumber: 0,
pageSize: 0,
totalElements: 0,
totalPages: 0,
content:[],
}


const  AppContext =React.createContext();
const AppProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initalState);
    let API="http://localhost:9090/api/users/posts";

const fetchApi=async(url)=>{
    try{
        const res=await fetch(url);
        const data=await res.json();
        // isLoading=false;
        console.log(data);
        dispatch({
            type:"GET_TWEETS",
            payload:{
                content:data.content,
                totalPages:data.totalPages,
            }
        })
    }catch(error){

    }
}

    useEffect(()=>{
        fetchApi(`${API}?pageNumber=${state.pageNumber}`);
    },[]);

    return(
        <AppContext.Provider value={{...state}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext=()=>{
    return useContext(AppContext);
}
export {AppContext,AppProvider,useGlobalContext};
