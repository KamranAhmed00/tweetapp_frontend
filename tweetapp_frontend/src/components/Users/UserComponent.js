import { Stack } from '@mui/material';
import moment from 'moment'
import React from 'react'
import { Card, CardBody, CardColumns, CardFooter, CardLink, CardSubtitle, CardText, CardTitle, Col, List, ListInlineItem, Row } from 'reactstrap';
import Like from '../Like';
import BackgroundLetterAvatars from '../Util/AvatarAlgo';
import Delete from '../Delete';
import { currentUser } from '../Util/Operations';
export const UserComponent = (props) => {
    const userId = currentUser().userDto.id;
    return (
        <>
            {props.data === null || props.data == 0 ? <h2>No Users Found..</h2> : props.data && props.data.map((user) => (
                <List type="inline" key={user.id} >
                    <ListInlineItem>
                        <CardColumns
                            style={{
                                width: '40rem'
                            }}
                        >
                            <Card className="my-2">
                                <CardBody>
                                    <Row>
                                        <Col md={9}>
                                            <Stack direction="row" spacing={2}>
                                                <BackgroundLetterAvatars first={user.firstName} last={user.lastName} />
                                                <CardTitle tag="h5" className='mt-1'>
                                                    {user.firstName} {user.lastName}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mt-2  text-muted"
                                                    tag="h6"
                                                >
                                                    {user.loginHandle}
                                                </CardSubtitle>
                                            </Stack>
                                        </Col>
                                        <Col className='mt-1'>
                                            <CardText>
                                                <small className="text-muted">
                                                    {/* {moment(tweet.addedDate).fromNow()} */}
                                                </small>
                                            </CardText>
                                        </Col>
                                    </Row>
                                    <div style={{ margin: '10px 0px 0px 70px' }}>
                                        <CardText >
                                            {/* {tweet.content} */}
                                        </CardText>
                                    </div>
                                </CardBody>
                                {/* <CardFooter className='mx-5'> */}
                                {/* <Stack direction="row" spacing={4} marginLeft={4} marginRight={4} borderTop={1}>
                        {/* <Row > */}
                                {/* <Col md={3}> */}
                                {/* <Like /> */}
                                {/* </Col> */}
                                {/* <Col md={6}> */}
                                {/* <Comment comment={tweet.comments} post={tweet.postId}/> */}
                                {/* </Col> */}
                                {/* <Col md={3}> */}
                                {/* {tweet.user.id===userId?<Delete id={tweet.postId}/>:""} */}
                                {/* </Col> */}
                                {/* </Row> */}
                                {/* </Stack> */}
                                {/* </CardFooter> */}
                            </Card>
                        </CardColumns>
                        {/* <h6>{tweet.title}</h6>
        <h6>{tweet.content}</h6>
        <h6>{tweet.addedDate}</h6>
        <h6>{tweet.user.firstName}{tweet.user.lastName}</h6> */}
                    </ListInlineItem>
                </List>

            ))}</>
    )
}
