import { Col, Row } from "reactstrap";
import { isLoggedIn } from "../Util/Operations";
import PostArea from "./PostArea";
import { Stack } from "@mui/material";
import SideMenu from "./SideMenu";

const Home=()=>{
    return (isLoggedIn()?
        <div className="container-fluid mt-4">
        <Row >
            <Col sm={{size:3}}>
            <SideMenu /></Col>
            <Col sm={{size:7}}>
            <PostArea/></Col>
        </Row>
        </div>:<div>Please Login
        </div>
    );
}
export default Home;