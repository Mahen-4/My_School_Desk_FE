import { useQuery } from "@tanstack/react-query";
import { use_get_all_classes } from "../../api/classes_api";
import { use_get_all_homeworks_created_teacher, delete_homework_db } from "../../api/homeworks_api";
import type { Classe_interface } from "../../api/classes_api";
import type { Homeworks_created_interface } from "../../api/homeworks_api";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_homeworks(){
    
    const {data: all_classes, isLoading} = use_get_all_classes() as {
        data: Classe_interface[],
        isLoading: boolean
    }

    const {data : all_homeworks_created, isPending} = use_get_all_homeworks_created_teacher()as {
        data: Homeworks_created_interface[],
        isPending: boolean
    }

    const navigate = useNavigate();
    const all_string = "Toutes les classes"
    const [selected_classe_name, setSelected_classe_name]  = useState(all_string)


    return(
        <>
        <Toaster position="top-right"/>

        { !isLoading && !isPending && 

            <div className="">

                {/* get all classes from db */}
                <div className="header_page">

                    <select className="rounded-(--my-radius) bg-white px-4 py-2 text-gray-600 text-l w-60 h-12" onChange={(e)=>{
                        setSelected_classe_name(e.target.options[e.target.selectedIndex].text) 
                    }}>
                        <option value={all_string}>{all_string}</option>
                    {all_classes.map(({id, name}: Classe_interface ) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                    
                    </select>
                    <NavLink to='/teacher/devoirs/ajouter' className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded">
                    Ajouter un devoir &gt;
                    </NavLink>
                </div>

                

                {/* all homeworks created fetched from db */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full p-2">
                    {/* Filter system using class names*/}
                    {Object.keys(all_homeworks_created).filter(
                        (key:any) => selected_classe_name === all_string || all_homeworks_created[key].classe_name === selected_classe_name).reverse().map(
                            (key: any) => (
                                <div key={key} className="bg-white rounded-(--my-radius) shadow-sm">

                                    {/* Header  with classe name + edit and delete button */}
                                    <div className="flex items-center justify-between bg-linear-to-r from-primary-blue to-primary-beige rounded-t px-4 py-2">

                                        <h2 className="text-white font-semibold">{all_homeworks_created[key].classe_name}</h2>
                                        <div>
                                            <button onClick={
                                                ()=> navigate("modifier",{
                                                    state:{
                                                        state_homework_id: key,
                                                        state_classe_name:all_homeworks_created[key].classe_name,
                                                        state_description:all_homeworks_created[key].homework_description ,
                                                        state_due_date:all_homeworks_created[key].homework_due_date,
                                                    }
                                                    })
                                                } 
                                                className="mr-3 hover:cursor-pointer bg-orange-300 text-white text-xs rounded-(--my-radius) px-3 py-1 hover:bg-orange-400 transition">
                                                Modifier
                                            </button>
                                            <button onClick={()=>{
                                                toast.promise(
                                                    delete_homework_db(key),
                                                    {
                                                        loading: 'suppression...',
                                                        success: <b>Devoir supprimé</b>,
                                                        error: <b>Erreur lors de la suppression</b>,
                                                    }
                                                    );
                                                window.location.reload();
                                                }} 
                                                className="hover:cursor-pointer bg-red-300 text-white text-xs rounded-(--my-radius) px-3 py-1 hover:bg-red-400 transition">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>

                            {/* description */}
                            <p className="mt-2 text-sm text-gray-700 p-4">
                            Pour le <span className="font-semibold">{all_homeworks_created[key].homework_due_date.toString()}</span> : {all_homeworks_created[key].homework_description}
                            </p>
                        </div>
                        ))}
                </div>
            </div>
        }
    </>
    )
}

