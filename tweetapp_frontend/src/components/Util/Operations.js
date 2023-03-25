export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data!=null){
        return true;
    }
    else{
        return false;
    }
};

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
};

export const doLogout=()=>{
    localStorage.removeItem("data");
    // next()
};

export const currentUser=()=>{
    if(isLoggedIn)
    return JSON.parse(localStorage.getItem("data"));
    else
        return false;
};