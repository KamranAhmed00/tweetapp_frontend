import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../Util/Operations';
const PrivateRoute=()=>{

// if(isLoggedIn())
// return <Navigate to={"/"} />
// else
// return <Navigate to={"/login"} />
}
export default PrivateRoute;