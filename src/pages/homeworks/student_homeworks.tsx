import { useQuery } from "@tanstack/react-query";
import { use_get_all_subjects } from "../../api/subjects_api";
import type { Subject_interface } from "../../api/subjects_api";
import { use_get_all_homeworks } from "../../api/homeworks_api";
import type { Homeworks_student_interface } from "../../api/homeworks_api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Students_homeworks(){
    
    const {data: all_subjects, isLoading} = use_get_all_subjects() as {
        data: Subject_interface[],
        isLoading: boolean
    }

    const {data : all_homeworks, isPending} = use_get_all_homeworks()as {
        data: Homeworks_student_interface[],
        isPending: boolean
    }

    const all_string = "Toutes les matières"

    const [selected_subject, setSelected_subject]  = useState(all_string)

    

    return(
        <>
        { !isLoading && !isPending && 

            <div>

                {/* get all subjects from db */}
                <div className="header_page">
                    <span>Devoirs à faire : <span className="text-lg text-primary-blue font-bold">{Object.keys(all_homeworks).length}</span></span>
                    <select className="rounded-(--my-radius) bg-white px-4 py-2 text-gray-600 text-l w-60 h-12" onChange={(e)=>{
                        setSelected_subject(e.target.options[e.target.selectedIndex].text) 
                    }}>
                        <option value={all_string}>{all_string}</option>
                    {all_subjects.map(({id, name}: Subject_interface ) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                    
                    </select>
                </div>

                {/* all homeworks  fetched from db */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full p-2">
                    {/* Filter system using class names*/}
                    {Object.keys(all_homeworks).filter(
                        (key:any) => selected_subject === all_string || all_homeworks[key].homework_subject === selected_subject).reverse().map(
                            (key: any) => (
                                <div key={key} className="bg-white rounded-(--my-radius) shadow-sm">

                                    {/* Header*/}
                                    <div className="flex items-center justify-between bg-linear-to-r from-primary-blue to-primary-beige rounded-t px-4 py-2">
                                        <h2 className="text-primary-beige font-bold">Pour le {all_homeworks[key].homework_due_date}</h2> 
                                        <h2 className="text-primary-blue font-semibold">{all_homeworks[key].homework_subject}</h2>
                                    </div>

                            {/* description */}
                            <p className="mt-2 text-sm text-gray-700 p-4">{all_homeworks[key].homework_description}</p>
                        </div>
                        ))}
                </div>
            </div>
        }
    </>
    )
}

