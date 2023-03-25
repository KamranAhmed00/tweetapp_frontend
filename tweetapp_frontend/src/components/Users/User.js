import { Icon } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Input, InputGroup, Row, Spinner } from 'reactstrap';
import { myAxios } from '../Util';
import { Paginations } from './Pagination';
import { UserComponent } from './UserComponent';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';

export const Users = (props) => {
    const [value, setValue] = useState([])
    const [svalue, setSValue] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                // http://tweetapp-env.eba-xb3db7je.us-west-2.elasticbeanstalk.com
                setLoading(true)
                const res = await fetch(`https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-xb3db7je.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/users/all`)
                const data = await res.json()
                setValue(data)
                setLoading(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [pageNumber])

    const page = (index) => {
        setPageNumber(index)
    }
    useEffect(() => {

    }, [])
        const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setDisplay(false)
      };
      
      const searchUser=()=>{
        if(searchInput===''){
            toast.warning("Type User Name to Search")
            return;
        }
        myAxios.get(`/api/v1.0/tweets/user/search/${searchInput}`)
        .then((response) => response.data).then((data)=>{
          console.log(data)
        setDisplay(true);
            setSValue(data)
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
    //   if (searchInput.length > 0) {
        // countries.filter((country) => {
        // return country.name.match(searchInput);
    // });}
    // myAxios
    // .get("/api/users/posts" )
    // .then((response) => response.data);
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'15px'
        }} >
            <Stack direction={"column"} spacing={4} >
            
                {/* <Form > */}
                    <InputGroup>
                    <Input type="text" placeholder='Type UserName to Search...' aria-label='search' onChange={handleChange}
   value={searchInput}/>
                    <Button onClick={searchUser}><SearchIcon /></Button>
                    </InputGroup>
                {/* </Form> */}
                
                <Container>
            <ul>
                {loading ? <Spinner
                    color="primary"
                >
                    Loading...
                </Spinner> : display?<UserComponent data={svalue} />:<UserComponent data={value} />
                }
                {value.totalPages > 1 ? <Paginations totalPages={value.totalPages} pageNumber={page} /> : ""}
            </ul>
            </Container>
            </Stack>
        </div>
    )
}
