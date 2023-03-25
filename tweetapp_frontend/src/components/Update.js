import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { toast } from 'react-toastify';
import { myAxios } from './Util';
import { currentUser } from './Util/Operations';
const Update = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  let userId=currentUser().userDto.id;
  let postId = props.post;
  const [ref,setRef]=useState(0)
  // console.log(props.post)
  // const [value, setValue] = useState(null);
  
  const [data, setData] = useState({
    title: props.title,
    content: props.content,
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
  
  const updateTweet = (event) => {
    // event.preventDefault(); 
    if(data.content.trim()===''){
      toast.warning("Type something to Post..")
      return;
    }
    props.refresh()
    const json = JSON.stringify({ title: data.title.trim(),content:data.content.trim() });
   
    myAxios
      .put(`/api/v1.0/tweets/posts/${postId}`,json,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("Updated Successfully!!");
        setRef(ref+1)
        console.log(ref)
        props.refresh(ref)
        toggle()
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

  return (
    <div 
    // style={{
    //   margin: 'auto',
    //   display: 'block',
    //   width: 'fit-content'
    // }}
    >
      <IconButton aria-label="update" onClick={toggle} >
      <ModeEditOutlineOutlinedIcon color="success"/>
      </IconButton> 
      <Modal isOpen={modal} toggle={toggle} size='lg' scrollable>
      <ModalHeader toggle={toggle} > Update Post
          </ModalHeader>
        <ModalBody>
          
          <div>
            <div className="container-fluid comment mt-1">
            <textarea className="text"
                value={data.content}
                maxLength='144'
                onChange={(e) => handleService(e, "content")}
                placeholder="Update Post...."
              ></textarea>
              <Input type="text" placeholder='#HaSh_TaG (optional)' maxLength={50} value={data.title} onChange={(e) => handleService(e, "title")}/>
           
            </div>
            <Button className="cmt" onClick={updateTweet}>Update</Button>
          </div>
          <ModalFooter>
          </ModalFooter>
        </ModalBody>

      </Modal>
      

    </div>
  )
}

export default Update;
