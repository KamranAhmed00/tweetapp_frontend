import { Stack } from '@mui/material';
import React, { useEffect } from 'react'
import moment from 'moment'
import { Card, CardBody, CardColumns, CardFooter, CardLink, CardSubtitle, CardText, CardTitle, Col, List, ListInlineItem, Row } from 'reactstrap';
import './Comment.css'
import BackgroundLetterAvatars from '../Util/AvatarAlgo';
export const CommentComp = (props) => {
    
  return (
    <>
    {props.comment===null||props.comment==0?<h6>No Comments</h6>:props.comment && props.comment.map((com) => (
        <List type="inline" key={com.id} >
            <ListInlineItem>
                <CardColumns
                    style={{
                        width: '30rem'
                    }}
                >
                    <Card className="my-2">
                        <CardBody>
                            <Stack direction={'row'} spacing={2}>
                            <BackgroundLetterAvatars first={com.user.firstName} last={com.user.lastName}/>
                            <CardTitle tag="h5">
                                {com.user.firstName} {com.user.lastName}
                            </CardTitle>
                            <CardText className="text-muted"
                                                    tag="h6">
                            {com.user.loginHandle}
                            </CardText>
                            <CardText>
                            <small className="text-muted">
                                                        {moment(com.createdAt).fromNow()}
                                                    </small>
                            </CardText>
                            </Stack>
                            <div style={{ margin: '10px 0px 0px 70px' }}>
                            {com.title!==null?<CardText >
                                            {com.title}
                                        </CardText>:""}
                                        <CardText >
                                            {com.content}
                                        </CardText>
                                    </div>
                            {/* <CardText>
                            {tweet.title}
                            </CardText> */}
                            {/* <CardText>
                                <small className="text-muted">
                                    {tweet.addedDate}
                                </small>
                            </CardText> */}
                        </CardBody>
                        {/* <CardFooter>
                        <Row>
                            <Col>
                            <Like />
                            </Col>
                            <Col>
                            <Comment id={tweet.id}/>
                            </Col>
                        </Row>
                        </CardFooter> */}
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
