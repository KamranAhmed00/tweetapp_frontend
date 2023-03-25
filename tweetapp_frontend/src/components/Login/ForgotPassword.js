import React, { useState } from 'react'
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../Util';
const ForgotPassword = () => {
    const [data,setData]=useState({
        email:'',
        password:'',
        conpassword:''
    });
    
    const handleChange=(event,property)=>{
        setData({
            ...data,[property]:event.target.value.trim()
        })
    }
    
    const reset=()=>{
      setData({
        email:'',
        password:'',
        conpassword:''
      })
    }
    const navigate = useNavigate();
    const submitForm=(event)=>{
        event.preventDefault();
        console.log(data);
        if(data.email.trim()===''||data.password.trim()===''||data.conpassword.trim()===''){
          toast.error("All Fields are required");
          return;
        }
        if(data.password!==data.conpassword){
            toast.error("New Password and Confirm Password are not same");
          return;
        }
        myAxios.put(`/api/v1.0/tweets/${data.email}/forgot`, data)
        .then((response) => response.data).then((data)=>{
          console.log("User Login :")
          console.log(data)
        //   props.submit(true);
          navigate("/");
          toast.success("Successfully Done!!");
        }).catch((error)=>{
          console.log(error)
          if(error.response.status===400||error.response.status===401||error.response.status===404){
            toast.error(error.response.data.message)
          }
          else{
            toast.error("Something Went Wrong")
          }
        })
    
    
    }
  return (
    <div
   >
        <Container  style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"20px"
    }} >
        <Row>
            <h2 style={{fontWeight:"bold"}}>Forgot Password ?</h2>
        <Form 
        onSubmit={submitForm}
        >
                <FormGroup>
                  <Label for="email" style={{fontWeight:"bold"}}>Enter Your User name/Email Id</Label>
                  <Input
                    type="text"
                    placeholder="Enter Your User name/Email Id"
                    id="email"
                    value={data.email}
                    onChange={(e=>handleChange(e,'email'))}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" style={{fontWeight:"bold"}}>Enter Your New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Your New Password"
                    id="password"
                    value={data.password}
                    onChange={(e=>handleChange(e,'password'))}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="conpassword" style={{fontWeight:"bold"}}>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    id="conpassword"
                    value={data.conpassword}
                    onChange={(e=>handleChange(e,'conpassword'))}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="primary">Login</Button>
                  <Button type="reset" color="danger" className="ms-2" 
                  onClick={reset}
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
              </Row>
        </Container>
    </div>
  )
}

export default ForgotPassword