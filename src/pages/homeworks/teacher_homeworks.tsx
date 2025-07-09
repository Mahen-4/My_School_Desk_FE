import { useQuery } from "@tanstack/react-query";
import { use_get_all_classes } from "../../api/classes_api";
import { use_get_all_homeworks_created_teacher } from "../../api/homeworks_api";
import type { Classe_interface } from "../../api/classes_api";
import type { Homeworks_created_interface } from "../../api/homeworks_api";
import { Navigate, NavLink } from "react-router-dom";

export default function Teacher_homeworks(){
    
    const {data: all_classes, isLoading} = use_get_all_classes() as {
        data: Classe_interface[],
        isLoading: boolean
    }

    const {data : all_homeworks_created, isPending} = use_get_all_homeworks_created_teacher()as {
        data: Homeworks_created_interface[],
        isPending: boolean
    }
    
    console.log(all_homeworks_created)
    return(
        <>
        { !isLoading && !isPending && 
            <div className="flex-1 w-full p-6 ">
                {/* get all classes from db */}
                <div className="mb-6 w-full border-b-4 border-primary-blue pb-4">
                    <select className="rounded-(--my-radius) bg-white px-4 py-2 text-gray-600 text-l w-60 h-12">
                    {all_classes.map(({id, name}: Classe_interface ) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                    </select>
                </div>

                <NavLink to='/teacher/devoirs/ajouter' className="mb-6 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded">
                    Ajouter un devoir &gt;
                </NavLink>

                {/* all homeworks created fetched from db */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-335">
                    {Object.keys(all_homeworks_created).map((key: any) => (
                        <div key={key} className="bg-white rounded-(--my-radius) shadow-sm">
                            {/* Header bleu foncé avec titre + bouton modifier */}
                            <div className="flex items-center justify-between bg-linear-to-r from-primary-blue to-primary-beige rounded-t px-4 py-2">
                            <h2 className="text-white font-semibold">{all_homeworks_created[key].classe_name}</h2>
                            <button className="bg-orange-300 text-white text-xs rounded-(--my-radius) px-3 py-1 hover:bg-orange-400 transition">
                                Modifier
                            </button>
                            </div>
                            {/* Texte en dessous */}
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

