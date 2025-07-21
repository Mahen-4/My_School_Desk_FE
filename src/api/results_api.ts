import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";
import api from "./config";


export const add_results_db = async(data: {title: String, classe_name: string, result_on: number, all_results:{ [key: string]: number} }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/results/add', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}


export const edit_results_db = async(data: {title: String, result_on: number, all_results:{ [key: string]: number} }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.put('/results/edit', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const get_created_exam = async()=>{
    const res = await api.get("/results/get_created",{
        withCredentials: true,
    })
    return res.data
}

//execute request 
export const use_get_created_exam = ()=>{
  return useQuery({
    queryKey: ['all_exams_created'],
    queryFn: get_created_exam,
  });
}


export const delete_results_db = async(exam_title_classe: String) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.delete(`/results/delete/${exam_title_classe}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}


export const get_student_results = async()=>{
    const res = await api.get("/results/get_student_results",{
        withCredentials: true,
    })
    return res.data
}

//execute request 
export const use_get_student_results = ()=>{
  return useQuery({
    queryKey: ['student_results'],
    queryFn: get_student_results,
    staleTime:  1000 * 60 * 15 // cache data expire in 15minutes
  });
}


export const get_last_results = async()=>{
    const res = await api.get("/results/get_last_results",{
        withCredentials: true,
    })
    return res.data
}


//execute request 
export const use_get_last_results = ()=>{
  return useQuery({
    queryKey: ['student_last_results'],
    queryFn: get_last_results,
    enabled: sessionStorage.getItem("user_type") === "student",
    staleTime: 1000 * 60 * 20, // cache data expire in 20 minutes

  });
}


