import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';
import './PostArea.css'
import { currentUser } from '../Util/Operations';
import { toast } from "react-toastify";
import { myAxios } from '../Util';
import { TweetComponent } from '../Tweet/TweetComponent';
import { TweetsByUser } from '../Tweet/TweetsByUser';


const PostArea = () => {
let userId=currentUser().userDto.id;
const [value,setValue]=useState(null);
const [ref,setRef]=useState(0);
const [data,setData]=useState({
    title:"",
    content:"",
});
const [error, setError] = useState({
    errors: {},
    isError: false,
  });
const[state,setState] = useState({
    chars_left: 140,
  })

// console.log(text)

const handleService=(event,property)=>{
    console.log(event.target.value);
    // let trim=event.target.value.trim()
    setData({ ...data, [property]: event.target.value });
    // setText(event.target.value)
    const charCount = event.target.value.length;
  const charLength = 144 - charCount;
  setState({ chars_left: charLength });
}
console.log(currentUser().userDto.id);
const resetData=()=>{
    setData({
        title:"",
    content:"",
    })
}
const postTweet=(event)=>{
    // event.preventDefault();
    
    if(data.content.trim()===''){
      toast.warning("Type something to Post..")
      return;
    }
    // if(data.content.length>0){
    // // setData({
    // //   title:data.title.trim(),
    // //   content:data.content.trim()
    // // })
    // console.log()}
    const json = JSON.stringify({ title: data.title.trim(),content:data.content.trim() });
    myAxios
    .post(`/api/v1.0/tweets/${userId}/add`,json,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.data)
    .then((resp) => {
      console.log(resp);
      console.log("success log");
      toast.success("Tweet Posted !!");
      setRef(ref+1);
      resetData();
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
console.log(ref)
console.log(data)
  return (
    <>
    <div className="container-fluid post">
        <textarea className='textArea'
        value={data.content}
        maxLength='144'
        onChange={(e) => handleService(e, "content")}
        placeholder="What's happening ?"
        autoFocus
        >
        </textarea>
        <Input type="text" placeholder='#HaSh_TaG (optional)' maxLength={50} value={data.title} onChange={(e) => handleService(e, "title")}/>
        {/* {state.chars_left} */}
    </div>
    <Button className="tweet_button" onClick={postTweet} color="primary">Tweet</Button>
    {/* <TweetComponent value={value}/> */}
    <TweetsByUser refresh={ref}/>
    </>
  )
}

export default PostArea;