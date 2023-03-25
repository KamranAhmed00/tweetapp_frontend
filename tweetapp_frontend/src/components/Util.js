import axios from "axios";
export const BASE_URL='https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-xb3db7je.us-west-2.elasticbeanstalk.com';
// http://localhost:8182
export const myAxios=axios.create({
    baseURL:BASE_URL
});