import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Input } from 'reactstrap';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors'
import './Comment.css'
import CommentOutlined from '@mui/icons-material/CommentOutlined';
import { currentUser } from '../Util/Operations';
import { toast } from 'react-toastify';
import { myAxios } from '../Util';
import { CommentComp } from './CommentComp';
const Comment = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  let userId=currentUser().userDto.id;
  let postId = props.post;
  const [ref,setRef]=useState(0)
  // console.log(props.post)
  // const [value, setValue] = useState(null);
  
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [state, setState] = useState({
    chars_left: 140,
  })

  // console.log(text)
  

  const handleService = (event, property) => {
    console.log(event.target.value);
    setData({ ...data, [property]: event.target.value });
    // setText(event.target.value)
    const charCount = event.target.value.length;
    const charLength = 144 - charCount;
    setState({ chars_left: charLength });

  }
  console.log(currentUser().userDto.id);
  const resetData = () => {
    setData({
      title: "",
      content: "",
    })
  }
  const postComment = (event) => {
    // event.preventDefault();
    if(data.content.trim()===''){
      toast.warning("Give Some Interesting Comments..")
      return;
    }
    props.refresh()
    const json = JSON.stringify({ title: data.title.trim(),content:data.content.trim() });
    myAxios
      .post(`/api/v1.0/tweets/${postId}/reply/${userId}`, json,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        // toast.success("Tweet Posted !!");
        setRef(ref+1)
        props.refresh(ref)
        // window.location.reload();
        resetData();
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
        if(data.content.trim()==='')
              toast.error(error.response.data.content);   
        if(error.response.status===400||error.response.status===401||error.response.status===404){
          toast.error(error.response.data.message)
        }
        else{
          toast.error("Something Went Wrong")
        }
      });
  }

  return (
    <div 
    // style={{
    //   margin: 'auto',
    //   display: 'block',
    //   width: 'fit-content'
    // }}
    >
      <IconButton aria-label="add to favorites" onClick={toggle}>
        <CommentOutlined sx={{ color: blue[500] }} />
      </IconButton> {props.comment.length>0?<small>{props.comment.length}</small>:""}
      <Modal isOpen={modal} toggle={toggle} size='lg' scrollable>
      <ModalHeader toggle={toggle} > Comments
          </ModalHeader>
        <ModalBody>
          
        
            <div className="container-fluid comment mt-1">
              <textarea className="text"
                value={data.content}
                maxLength='144'
                onChange={(e) => handleService(e, "content")}
                placeholder="Write your Comments Here"
              ></textarea>
              <Input type="text" placeholder='#HaSh_TaG (optional)' maxLength={50} value={data.title} onChange={(e) => handleService(e, "title")}/>
            </div>
            <Button className="cmt" onClick={postComment} color="primary">Comment</Button>
          
          <ModalFooter>
            <CommentComp comment={props.comment} />
          </ModalFooter>
        </ModalBody>

      </Modal>
      

    </div>
  )
}

export default Comment;
{/* <FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
            name="checkedH" />}
        /> */}
        {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button> */}