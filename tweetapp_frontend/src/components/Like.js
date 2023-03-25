import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { currentUser } from './Util/Operations';
import { myAxios } from './Util';
import { toast } from 'react-toastify';
const Like = (props) => {
	const postId=props.post
	const userId=currentUser().userDto.id;
	const val=props.status
    const [likes,setLike]=useState(val)
	const [ref,setRef]=useState(0)
	// const {likes}=props
	// const items=[props.liked]
	// let value=[]
	// console.log(items)
	// var index = props.liked.findIndex(p => p.uid === userId);
	// console.log(index)
	// if(index){
	// 	setLike(false)
	// }
	// else{
	// 	setLike(true)
	// }
	// for (var i = 0; i < props.liked.length; i++) {
	// 	for (var key in props.liked[i]) {
	// 	  console.log(key + ' == ' + props.liked[i][key]);
	// 	}
	//   }
	// var val = items.find(function(o){ return o.uid===userId }).value;
	// console.log(val)
	// for(let i=0;i<items.length;i++){
	// 	if([items.uid]===userId){
	// 		console.log("Found")
	// 	}
	// 	else{
	// 		console.log(items[i])
	// 	}
	// }
	// let status=false
	// console.log(props.likes.user)
	// let bool=''
	// console.log(userId)
	// value=items.length>0?items.map((like)=>(
		
	// 	[like.user.id]==userId?true:false)):false;
	// 	console.log(value)
	// useEffect(() => {
	// 	// setLike({status})
    // }, [likes.status])
	// const fillColor=(status)=>{
	// 	setLike(status)
	// }
const colorChange=()=>{
    setLike(!likes)
		if(likes===false){
	myAxios
    .post(`/api/v1.0/tweets/${userId}/like/${postId}`)
    .then((response) => response.data).then((resp) => {
      console.log(resp);
      toast.success("Liked");
	  setRef(ref+1)
      props.refresh(ref)
    })
    .catch((error) => {
      console.log(error);
      console.log("Error log");
      });
	}
	else{
		myAxios
    .delete(`/api/v1.0/tweets/${userId}/unlike/${postId}`)
    .then((response) => response.data).then((resp) => {
      console.log(resp);
      toast.warning("Disliked");
	  setRef(ref-1)
      props.refresh(ref+1)
    })
    .catch((error) => {
      console.log(error);
      console.log("Error log");
      });
	}
}
// style={{
// 	margin: 'auto',
// 	display: 'block',
// 	width: 'fit-content'
// 	}}
return (
	<div >
		<IconButton aria-label="add to favorites" onClick={colorChange}>
		<ThumbUp sx={likes?{color:blue[500]}:{}}/>
        </IconButton>
		{/* {props.liked.length} */}
		{props.count}
	{/* <FormControlLabel
		control={<Checkbox icon={<FavoriteBorder />}
				checkedIcon={<Favorite />}
		name="checkedH" />}
	/> */}
    
	</div>
);
}

export default Like;
