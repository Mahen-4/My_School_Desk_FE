import axios from "axios"
import Cookies from "js-cookie";


interface LoginCredentials {
    email: String,
    password: String,
}

//get csrf token
export const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/auth/csrf/", {
    withCredentials: true,  
  });
};

export const login = async(credentials: LoginCredentials) => {
    
    const csrfToken = Cookies.get("csrftoken"); //get csrf token

    const res = await axios.post('http://localhost:8000/auth/login/', credentials, {
        headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token
        'Content-Type': 'application/json',
        },
        withCredentials: true,
    })

    return res.data
}

export const digi_code_check = async(code : {digi_code: number }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.post('http://localhost:8000/auth/digi_code_check/', code, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}