import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";

export interface Homeworks_created_interface{
    homework_description :string,
    homework_created_at : Date,
    homework_due_date : Date,
    classe_name: string
}

export interface Homeworks_student_interface{
  homework_subject: string,
  homework_description : string,
  homework_due_date : string
}

export const get_all_homeworks_created_teacher = async()=>{
    const res = await axios.get("http://localhost:8000/homeworks/all_created_teacher", {
    withCredentials: true,  
  });

  return res.data
}
//execute request and store in cache
export const use_get_all_homeworks_created_teacher = ()=>{
  return useQuery({
    queryKey: ['all_homeworks_created_teacher'],
    queryFn: get_all_homeworks_created_teacher,
  });
}

export const get_all_homeworks = async()=>{
    const res = await axios.get("http://localhost:8000/homeworks/all", {
    withCredentials: true,  
  });

  return res.data
}

//execute request and store in cache
export const use_get_all_homeworks = ()=>{
  return useQuery({
    queryKey: ['all_homeworks'],
    queryFn: get_all_homeworks,
  });
}




export const add_homework_db = async(data : {description: string, due_date: String, classe: String }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.post('http://localhost:8000/homeworks/add_homework', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}


export const edit_homework_db = async(data : {homework_id: Number, description: string, due_date: String, classe: String }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.put('http://localhost:8000/homeworks/edit_homework', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const delete_homework_db = async(homework_id: Number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.delete(`http://localhost:8000/homeworks/delete_homework/${homework_id}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}

export const get_last_homeworks = async()=>{
    const res = await axios.get("http://localhost:8000/homeworks/get_last_homeworks", {
    withCredentials: true,  
  });

  return res.data
}


//execute request and store in cache
export const use_get_last_homeworks = ()=>{
  return useQuery({
    queryKey: ['last_homeworks'],
    queryFn: get_last_homeworks,
    enabled: sessionStorage.getItem("user_type") === "student",
    staleTime: 1000 * 60 * 20, // cache data expire in 20 minutes

  });
}




export const get_last_homeworks_created_teacher = async()=>{
    const res = await axios.get("http://localhost:8000/homeworks/get_last_homeworks_created_teacher", {
    withCredentials: true,  
  });

  return res.data
}


//execute request and store in cache
export const use_get_last_homeworks_created_teacher = ()=>{
  return useQuery({
    queryKey: ['last_homeworks_created_teacher'],
    queryFn: get_last_homeworks_created_teacher,
    enabled: sessionStorage.getItem("user_type") === "teacher",
    staleTime: 1000 * 60 * 2, // cache data expire in 2minutes
  });
}