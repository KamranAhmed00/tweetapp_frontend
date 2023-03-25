import './App.css';
import Base from './components/Base';
import {BrowserRouter,Route,Routes, useNavigate} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import About from './components/About/About';
import CustomNavbar from './components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashBoard from './components/Routes/UserDashBoard';
import PrivateRoute from './components/Routes/PrivateRoute';
import { doLogout, isLoggedIn } from './components/Util/Operations';
import Tweet from './components/Tweets/Tweet';
import { useState } from 'react';
import { TweetComp } from './components/Tweets/TweetComp';
import { Tweets } from './components/Tweet/Tweets';
import { Users } from './components/Users/User';
import tweet from './components/images/tweet.jpg'
import ForgotPassword from './components/Login/ForgotPassword';
function App(){
  
  const [isLogged,setIsLogged]=useState(isLoggedIn());
  // let isLogged=isLoggedIn();
  // console.log(isLogged);
  let routes
  const loginHandler=(value)=>{
    if(value===true)
      setIsLogged(true)
    else
      setIsLogged(false)
  }
  const logouthandler=()=>{
    doLogout()
    setIsLogged(false)
  }


  if(isLoggedIn()){
    routes=(
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tweets" element={<Tweets/>} />
      {/* <Route path="/tweet" element={<TweetComp/>} /> */}
      <Route path="/users" element={<Users/>}/>
      {/* <Route path="/about" element={<About/>}/> */}

      {/* <Route path="/user" element={<PrivateRoute/>}>
      <Route path="dashboard" element={<UserDashBoard/>}/>
      </Route> */}
      
    </Routes>
    )
  }else{
    routes=(
      <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/" element={<Login submit={loginHandler}/>} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/about" element={<About/>}/> */}

      {/* <Route path="/user" element={<PrivateRoute/>}>
      <Route path="dashboard" element={<UserDashBoard/>}/>
      </Route> */}
    </Routes>
    )
  }

  return (
    <div 
    // style={{backgroundColor:"#e5e5e5",height:"100%"}} 
    // style={{ backgroundImage:`url(${tweet})`,backgroundRepeat:"no-repeat",backgroundSize:"contain" ,height:"auto"}}
    >
      
      <BrowserRouter>
      <ToastContainer />
      <CustomNavbar logout={logouthandler}/>
      {routes}
      </BrowserRouter>
      </div>
  );
}

export default App;
