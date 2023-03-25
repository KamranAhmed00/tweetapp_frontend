import React, { useEffect } from "react";
import { getAllPosts } from "../Service/Service";
import { useGlobalContext } from "./Context";
const Tweet=()=>{
    const {content,totalPages}=useGlobalContext();
    // let isLoading=true;
    // getAllPosts().then((data)=>{
    //     console.log(data);
    // }).catch((error)=>{

    // });

    // if(isLoading){
    //     return <>
    //     <h1>Loading..</h1>
    //     </>
    // }
    return (
        <div>
        <h1>This is Tweet Page</h1>
        {content.map((val)=>{
            return <h2>{val.firstName}</h2>
            console.log(val.firstName)
        })}
        </div>
    );
}
export default Tweet;