import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";


export const add_results_db = async(data: {title: String, classe_name: string, result_on: number, all_results:{ [key: string]: number} }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.post('http://localhost:8000/results/add', data, {
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

  const res = await axios.put('http://localhost:8000/results/edit', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const get_created_exam = async()=>{
    const res = await axios.get("http://localhost:8000/results/get_created",{
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

  const res = await axios.delete(`http://localhost:8000/results/delete/${exam_title_classe}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}


export const get_student_results = async()=>{
    const res = await axios.get("http://localhost:8000/results/get_student_results",{
        withCredentials: true,
    })
    return res.data
}

//execute request 
export const use_get_student_results = ()=>{
  return useQuery({
    queryKey: ['student_results'],
    queryFn: get_student_results,
  });
}