import { Avatar } from '@mui/material';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { Stack } from '@mui/system';
import React from 'react'
import { Button, Card, CardBody, CardLink, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { HomeLetterAvatars } from '../Util/AvatarAlgo';
import { currentUser } from '../Util/Operations';

const SideMenu = () => {
  const data=currentUser().userDto;
  return (
    <div>
      <Card
  style={{
    width: '18rem'
  }}
>
    <CardBody className='d-flex justify-content-center'>
    <HomeLetterAvatars  first={data.firstName} last={data.lastName}/>
      </CardBody>
  <CardBody className='d-flex justify-content-center'>
    <Stack direction={"column"}>
    <CardTitle tag="h4" style={{fontWeight:"bold"}}>
    {data.firstName} {data.lastName}
    </CardTitle>
    <CardText >
      <small className='text-muted'>     
       {data.loginHandle}
       </small>
    </CardText>
    </Stack>
  </CardBody>
  
</Card>
    </div>
  )
}

export default SideMenu;