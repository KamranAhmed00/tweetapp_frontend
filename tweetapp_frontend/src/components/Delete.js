import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { toast } from "react-toastify";
import { myAxios } from './Util';
const Delete = (props) => {
    const [flag,setFlag]=useState(false)
    const [ref,setRef]=useState(0)
	const [error, setError] = useState({
		errors: {},
		isError: false,
	  });
	const tweetId=props.id
  // useEffect(()=>{

  // },[ref])
const deleteTweet=()=>{
    setFlag(!flag)
    props.refresh()
	myAxios
    .delete(`/api/v1.0/tweets/delete/${tweetId}`)
    .then((response) => response.data)
    .then((resp) => {
      console.log(resp);
      console.log("success log");
      toast.success("Post Deleted Successfully!!");
      setRef(ref+1)
      props.refresh(ref+1)
    })
    .catch((error) => {
      console.log(error);
      console.log("Error log");
      setError({
        errors: error,
        isError: true,
      });
    });
}

return (
	<div >
        <IconButton aria-label="Delete Tweet" onClick={deleteTweet}>
        <DeleteIcon sx={flag?{ color:red[400]}:{}}/>
        </IconButton>
	</div>
);
}

export default Delete;
