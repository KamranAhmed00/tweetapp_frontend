import { Stack } from '@mui/material';
import moment from 'moment'
import React from 'react'
import { Card, CardBody, CardColumns, CardFooter, CardLink, CardSubtitle, CardText, CardTitle, Col, List, ListInlineItem, Row } from 'reactstrap';
import Comment from '../Comment/Comment';
import Like from '../Like';
import BackgroundLetterAvatars from '../Util/AvatarAlgo';
import Delete from '../Delete';
import { currentUser } from '../Util/Operations';
import Update from '../Update';
export const TweetComponent = (props) => {
    const userId = currentUser().userDto.id;
    const update = (ref) => {
        props.refresh(ref)
    }
    return (
        <>
            {props.value === null || props.value == 0 ? <h2 className='mt-4'>No Posts Added Yet</h2> : props.value && props.value.map((tweet) => (
                <List type="inline" key={tweet.postId} >
                    <ListInlineItem>
                        <CardColumns
                            style={{
                                width: '42rem'
                            }}
                        >
                            <Card className="my-2">
                                <CardBody>
                                    <Row>
                                        <Col md={9}>
                                            <Stack direction="row" spacing={2}>
                                                <BackgroundLetterAvatars first={tweet.user.firstName} last={tweet.user.lastName} />
                                                <CardTitle tag="h5" className='mt-1'>
                                                    {tweet.user.firstName} {tweet.user.lastName}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mt-1  text-muted"
                                                    tag="h6"
                                                >
                                                    {tweet.user.loginHandle}
                                                </CardSubtitle>
                                            </Stack>
                                        </Col>
                                        <Col className='mt-1'>
                                            <Stack direction="row" >
                                                <CardText>
                                                    <small className="text-muted">
                                                        {moment(tweet.addedDate).fromNow()}
                                                    </small>

                                                </CardText>
                                                {tweet.user.id === userId ?
                                                    <Update content={tweet.content} title={tweet.title} post={tweet.postId} refresh={update}/>
                                                    : ""}
                                            </Stack>
                                        </Col>

                                    </Row>
                                    <div style={{ margin: '10px 0px 0px 70px' }}>
                                        {/* <CardBody> */}
                                        {tweet.title!==null?<CardText >
                                            {tweet.title}
                                        </CardText>:""}
                                        <CardText >
                                            {tweet.content}
                                        </CardText>
                                        {/* </CardBody> */}
                                    </div>
                                </CardBody>
                                {/* <CardFooter className='mx-5'> */}
                                <Stack direction="row" spacing={4} marginLeft={4} marginRight={4} borderTop={1}>

                                    <Col md={4} className="offset-1">
                                        <Like post={tweet.postId} liked={tweet.likes} refresh={update} count={tweet.likes.length} status={!tweet.likes.findIndex(p => p.uid === userId)} />
                                    </Col>
                                    <Col md={4} className="offset-1">
                                        <Comment comment={tweet.comments} post={tweet.postId} refresh={update} />
                                    </Col>
                                    {tweet.user.id === userId ? <Col >
                                        <Delete id={tweet.postId} refresh={update} />
                                    </Col> : ""}

                                </Stack>
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
