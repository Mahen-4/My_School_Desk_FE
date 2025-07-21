import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";
import api from "./config";

export interface Subject_interface {
  id: number;
  name: string;
}

export const get_all_subjects = async()=>{
    const res = await api.get("/school/subjects/all", {
    withCredentials: true,  
  });

  return res.data
}
//execute request and store in cache
export const use_get_all_subjects = ()=>{
  return useQuery({
    queryKey: ['all_subjects'],
    queryFn: get_all_subjects,
    staleTime: 1000 * 60 * 15 // cache data expire in 15minutes
  });
}