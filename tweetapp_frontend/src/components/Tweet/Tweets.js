import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import { myAxios } from '../Util';
import { Paginations } from './Pagination';
import { TweetComponent } from './TweetComponent';

export const Tweets = (props) => {
    const [value, setValue] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [ref,setRef]=useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // http://tweetapp-env.eba-xb3db7je.us-west-2.elasticbeanstalk.com
                setLoading(true)
                const res = await fetch(`https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-xb3db7je.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/all?pageNumber=${pageNumber}`)
                const data = await res.json()
                setValue(data)
                setLoading(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [pageNumber,ref])

    const refresh=(ref)=>{
        setRef(ref+1)
    }
    const page = (index) => {
        setPageNumber(index)
    }
    
    // myAxios
    // .get("/api/users/posts" )
    // .then((response) => response.data);
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} >

            <ul>
                {loading ? <Spinner
                    color="primary"
                >
                    Loading...
                </Spinner> : <TweetComponent value={value.content} refresh={refresh} />
                }
                {value.totalPages > 1 ? <Paginations totalPages={value.totalPages} pageNumber={page} /> : ""}
            </ul>

        </div>
    )
}
