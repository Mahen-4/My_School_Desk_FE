import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";
import api from "./config";


export const add_quiz_db = async(data : {title: string, description: string, classes: String[], questions_responses: {[key: string]: [{}]}  }) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/quiz/add', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const get_quiz_created = async()=>{
    const res = await api.get("/quiz/get_teacher_created_quiz", {
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

export const get_quiz_questions_responses = async(id:number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/quiz/get_quiz_questions_responses', id, {
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

  const res = await api.put('/quiz/edit', data, {
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

  const res = await api.delete(`/quiz/delete_question/${question_id}`, {
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

  const res = await api.delete(`/quiz/delete_quiz/${quiz_id}`, {
        headers: {
            "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
            'Content-Type': 'application/json',
            },
        withCredentials: true,
  })
  return res.data
}


export const get_classe_quiz = async()=>{
    const res = await api.get("/quiz/get_classe_quiz", {
    withCredentials: true,  
  });

  return res.data
}

//execute request and store in cache
export const use_get_classe_quiz = ()=>{
  return useQuery({
    queryKey: ['classe_quiz'],
    queryFn: get_classe_quiz,
    staleTime:  1000 * 60 * 15 // cache data expire in 15minutes
  });
}

export const get_quiz_info = async(id:number) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/quiz/get_quiz_info', id, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}

export const add_attempt = async(data: {quiz_id: number, score:string}) => {
  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('/quiz/add_attempt', data, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}