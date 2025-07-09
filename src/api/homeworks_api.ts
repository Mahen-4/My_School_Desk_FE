import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";

export interface Homeworks_created_interface{
    homework_description :string,
    homework_created_at : Date,
    homework_due_date : Date,
    classe_name: string
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

export const add_homework_db = async(data : {description: string, due_date: String, classe: Number }) => {

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