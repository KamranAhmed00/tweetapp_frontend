import { myAxios } from "../Util";
import { currentUser } from "../Util/Operations";
export const signup = (user) => {
  return myAxios
    .post("/api/v1.0/tweets/register", user)
    .then((response) => response.data);
};

export const loginUser = (login) => {
  return myAxios
    .post("/api/v1.0/tweets/login", login)
    .then((response) => response.data);
};

export const getAllPosts = () => {
  return myAxios
    .get("/api/users/posts" )
    .then((response) => response.data);
};

export const  postTweet= (data) => {
  return myAxios
    .post(`/api/users/${currentUser().userDto.id}/posts`,data)
    .then((response) => response.data);
};