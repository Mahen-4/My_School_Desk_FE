import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";


export const add_quiz_db = async(data : {title: string, description: string, classes: String[], questions_responses: {[key: string]: [{}]}  }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.post('http://localhost:8000/quiz/add', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const get_quiz_created = async()=>{
    const res = await axios.get("http://localhost:8000/quiz/get_teacher_created_quiz", {
    withCredentials: true,  
  });

  return res.data
}

//execute request and store in cache
export const use_get_quiz_created = ()=>{
  return useQuery({
    queryKey: ['quiz_created'],
    queryFn: get_quiz_created,
  });
}

export const get_quiz_info = async(id:number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.post('http://localhost:8000/quiz/get_quiz_info', id, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const edit_quiz_db = async(data : {quiz_id:number, title: string, description: string, classes: String[], questions_responses: {[key: string]: [{}]}  }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.put('http://localhost:8000/quiz/edit', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const delete_question_db = async(question_id: Number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.delete(`http://localhost:8000/quiz/delete_question/${question_id}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}

export const delete_quiz_db = async(quiz_id: Number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await axios.delete(`http://localhost:8000/quiz/delete_quiz/${quiz_id}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}