import axios from "axios"
import Cookies from "js-cookie";
import { useQuery} from "@tanstack/react-query";


export interface Classe_interface {
  id: number;
  name: string;
}

//get all classes from backend
export const get_all_classes = async () => {
  const res = await axios.get("http://localhost:8000/classes/all", {
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

