import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";
import api from "./config";


export interface Classe_interface {
  id: number;
  name: string;
}

export interface Student_full_name_interface{
  first_name: string,
  last_name: string
}

//get all classes from backend
export const get_all_classes = async () => {
  const res = await api.get("/school/classes/all", {
    withCredentials: true,  
  });

  return res.data
};

//execute request and store in cache
export const use_get_all_classes = ()=>{
  return useQuery({
    queryKey: ['all_classes'],
    queryFn: get_all_classes,
    staleTime: 1000 * 60 * 15 // cache data expire in 15minutes
  });
}



export const get_classe_students = async(classe_name: string) => {

  const csrfToken = Cookies.get("csrftoken"); //get csrf token

  const res = await api.post('school/classes/all_students', classe_name, {
    headers: {
        "X-CSRFToken": csrfToken ?? "", //send csrf token in header 
        'Content-Type': 'application/json',
        },
        withCredentials: true,
  })
  return res.data
}
