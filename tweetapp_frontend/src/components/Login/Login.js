import { useState } from "react";
import { Navigate,Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import home_img from '../images/tweet_home.gif'
import Typewriter from 'typewriter-effect';
import {
    Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardImgOverlay,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import App from "../../App";
import { loginUser } from "../Service/Service";
import { doLogin, isLoggedIn } from "../Util/Operations";

const Login = (props) => {
const [login,setLogin]=useState({
    username:'',
    password:''
});

const handleChange=(event,property)=>{
    setLogin({
        ...login,[property]:event.target.value
    })
}

const reset=()=>{
  setLogin({
    username:'',
    password:''
  })
}
const navigate = useNavigate();
const submitForm=(event)=>{
    event.preventDefault();
    console.log(login);

    if(login.username.trim()===''||login.password.trim()===''){
      toast.error("All Fields are required");
      return;
    }
    loginUser(login).then((data)=>{
      console.log("User Login :")
      console.log(data)
      doLogin(data,()=>{
        console.log("Login Data is saved to local storage");
        });
      props.submit(true);
      navigate("/");
      toast.success("Login Success");
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
    <div >
    <Container fluid>
      <Row >
        <Col sm={{ size: 6}} className="mt-4">
          <Card >
          <CardImgOverlay>
          <h1 style={{fontWeight:"bold"}}><Typewriter
  options={{
    strings: ['Welcome To TweetBuddy', 'Tweet out your thoughts!!'],
    autoStart: true,
    loop: true,
  }}
/></h1>
</CardImgOverlay>
          <CardImg
      alt="Card image cap"
      src={home_img}
      style={{
        // height: "100%"
      }}
      // width="100%"
    />
          </Card>
        </Col >
        <Col sm={{ size: 5}} className="mt-5 pt-4">
          <Card style={{backgroundColor:"#f5f5f5"}} >
            <CardHeader><h2 style={{fontWeight:"bold"}}>Login Here</h2></CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="username" style={{fontWeight:"bold"}}>User name/Email Id</Label>
                  <Input
                    type="text"
                    placeholder="Enter Your User name/Email Id"
                    id="username"
                    value={login.username}
                    onChange={(e=>handleChange(e,'username'))}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" style={{fontWeight:"bold"}}>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
                    value={login.password}
                    onChange={(e=>handleChange(e,'password'))}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="primary">Login</Button>
                  <Button type="reset" color="danger" className="ms-2" onClick={reset}>
                    Reset
                  </Button>
                </Container>
              </Form>
              <Link tag={Link} to="/forgot">Forgot Password?</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};
export default Login;
