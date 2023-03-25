import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { signup } from "../Service/Service";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    contact: "",
    email: "",
    password: "",
    loginHandle: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(()=>{
  //     console.log(data);
  // },[data])
  const handleChange = (event, property) => {
    console.log(event.target.value);
    setData({ ...data, [property]: event.target.value.trim() });
  };
  const resetData = () => {
    setData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      contact: "",
      email: "",
      password: "",
      loginHandle: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (error.isError) {
      toast.error("Form data is invalid");
      setError({ ...error, isError: false })
      return;
    }
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully !!");
        resetData();
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        if (error.response.status === 400 || error.response.status === 401 || error.response.status === 404) {
          toast.error(error.response.data.message)
        }
        else {
          toast.error("Something Went Wrong")
        }
        
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <div className="container">
      <Container fluid>
        <Row className="mt-4">
          <Col sm={{ size: 10, offset: 1}}>
            <Card>
              <CardHeader>
                <h3 style={{fontWeight:"bold"}}>Register Here</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="position-relative">
                        <Label for="fname" style={{fontWeight:"bold"}}>First name</Label>
                        <Input
                          type="text"
                          placeholder="Enter Your First Name"
                          id="fname"
                          onChange={(e) => handleChange(e, "firstName")}
                          value={data.firstName}
                          invalid={
                            data.firstName===''?error.errors?.response?.data?.firstName
                              ? true
                              : false:null
                          }
                        />
                        {data.firstName===''?<FormFeedback tooltip >
                          {error.errors?.response?.data?.firstName}
                        </FormFeedback>:null}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="position-relative">
                        <Label for="lname" style={{fontWeight:"bold"}}>Last name</Label>
                        <Input
                          type="text"
                          placeholder="Enter Your Last Name"
                          id="lname"
                          onChange={(e) => handleChange(e, "lastName")}
                          value={data.lastName}
                          invalid={
                            data.lastName===''?error.errors?.response?.data?.lastName
                              ? true
                              : false:null
                          }
                        />
                        {data.lastName===''?<FormFeedback tooltip >
                          {error.errors?.response?.data?.lastName}
                        </FormFeedback>:null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <FormGroup className="position-relative">
                        <Label for="gender" style={{fontWeight:"bold"}}>Gender</Label>
                        <Input
                          id="gender"
                          name="select"
                          type="select"
                          onChange={(e) => handleChange(e, "gender")}
                          value={data.gender}
                          invalid={
                            data.gender===''?error.errors?.response?.data?.gender
                              ? true
                              : false:null
                          }
                        >
                          <option defaultValue></option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Others</option>
                        </Input>
                        {data.gender===''?<FormFeedback tooltip >
                          {error.errors?.response?.data?.gender}
                        </FormFeedback>:null}
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup className="position-relative">
                        <Label for="dob" style={{fontWeight:"bold"}}>Date Of Birth</Label>
                        <Input
                          type="date"
                          placeholder="Enter Your Date Of Birth"
                          id="dob"
                          onChange={(e) => handleChange(e, "dob")}
                          value={data.dob}
                          invalid={
                            data.dob===''?error.errors?.response?.data?.dob
                              ? true
                              : false:null
                          }
                        />
                        {data.dob===''?<FormFeedback tooltip >
                          {error.errors?.response?.data?.dob}
                        </FormFeedback>:null}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="position-relative">
                        <Label for="contact" style={{fontWeight:"bold"}}>Contact Number</Label>
                        <Input
                          type="number"
                          placeholder="Enter Your Contact Number"
                          id="contact"
                          onChange={(e) => handleChange(e, "contact")}
                          value={data.contact}
                          maxLength="4"
                          size="4"
                          invalid={
                            // data.contact===''?
                            error.errors?.response?.data?.contact
                              ? true
                              : false
                              // :null
                          }
                        />
                        {/* {data.contact===''? */}
                        <FormFeedback tooltip >
                          {error.errors?.response?.data?.contact}
                        </FormFeedback>
                        {/* :null} */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="position-relative">
                    <Label for="email" style={{fontWeight:"bold"}}>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        // data.email===''?
                        error.errors?.response?.data?.email
                          ? true
                          : false
                          // :null
                      }
                    />
                    {/* {data.email===''? */}
                    <FormFeedback tooltip >
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                    {/* :null} */}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="password" style={{fontWeight:"bold"}}>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        data.password===''?error.errors?.response?.data?.password
                          ? true
                          : false:null
                      }
                    />
                    {data.password===''?<FormFeedback tooltip >
                      {error.errors?.response?.data?.password}
                    </FormFeedback>:null}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="loginHandle" style={{fontWeight:"bold"}}>Login handle</Label>
                    <Input
                      type="text"
                      placeholder="@User_Handle"
                      id="loginHandle"
                      onChange={(e) => handleChange(e, "loginHandle")}
                      value={data.loginHandle} 
                      invalid={
                        // data.loginHandle===''?
                        error.errors?.response?.data?.loginHandle
                          ? true
                          : false
                          // :null
                      }
                    />
                    {/* {data.loginHandle===''? */}
                    <FormFeedback tooltip >
                      {error.errors?.response?.data?.loginHandle}
                    </FormFeedback> 
                    {/* // :null} */}
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark" style={{fontWeight:"bold"}}>Register</Button>
                    <Button
                      type="reset"
                      color="secondary"
                      className="ms-2"
                      onClick={resetData}
                      style={{fontWeight:"bold"}}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Signup;
