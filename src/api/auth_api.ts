import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";
import api from "./config";

interface LoginCredentials {
    email: String,
    password: String,
}

//get csrf token
export const getCSRFToken = async () => {
  const res = await api.get("/auth/csrf/", {
    withCredentials: true,  
  });
  return res.data
};

export const use_getCSRFToken = ()=>{
  return useQuery({
    queryKey: ['csrftoken'],
    queryFn: getCSRFToken,
    staleTime: Infinity
  });
}


//send credentials for login 
export const login = async(credentials: LoginCredentials) => {
    
    const csrfToken = Cookies.get("csrftoken"); //get csrf token

    const res = await api.post('/auth/login/', credentials, {
        headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token
        'Content-Type': 'application/json',
        },
        withCredentials: true,
    })

    return res.data
}

// send digicode 
export const digi_code_check = async(code : {digi_code: number }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/auth/digi_code_check/', code, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

//send email to get link by mail
export const reset_password = async(email : {email: string }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/auth/reset_password/', email, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

//send email to get link by mail
export const change_password = async(data : {token: string, password: string }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/auth/change_password/', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

//get userdata
export const get_current_user = async () => {
  const res = await api.get("/auth/user_data/", {
    withCredentials: true,
  });
  return res.data;
};


export const use_current_user = ()=>{
  return useQuery({
    queryKey: ['user'],
    queryFn: get_current_user,
    staleTime: 1000 * 60 * 15, // cache data expire in 15minutes
    enabled: sessionStorage.getItem("is_logIn") === 'true'
  });
}


export const logout = async() => {
    
    //session data delete
    sessionStorage.removeItem("is_logIn"); 
    sessionStorage.removeItem("user_type"); 

    const csrfToken = Cookies.get("csrftoken"); //get csrf token

    const res = await api.post('/auth/logout/',{}, {
        headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token
        'Content-Type': 'application/json',
        },
        withCredentials: true,
    })

    return res.data
}