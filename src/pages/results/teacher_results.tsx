import { useState } from "react"
import { use_get_created_exam, delete_results_db } from "../../api/results_api"
import { NavLink, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_results(){


    const [search, setSearch] = useState('')

    const {data: created_exams, isPending} = use_get_created_exam()
    
    const navigate = useNavigate();
    
    let average_by_exam : any = {}

    if(!isPending) {
        //calc average for each exams and append to dict
        Object.keys(created_exams).forEach((examKey: string) => {
            const scores = created_exams[examKey].map((result: any) => result.student_score);
            const sum = scores.reduce((acc:any, val:any) => acc + val, 0);
            const average = scores.length > 0 ? sum / scores.length : 0;

            average_by_exam[examKey] = average;
        });
    }
    return(
        <>
        <Toaster position="top-right"/>
         {/* search input */}
        <div className="header_page">
            <input onChange={(e)=> setSearch(e.target.value)} placeholder="Recherche par titre d'examen ou nom de classe" type='text' maxLength={150} className='input_alone_text'/>
            <NavLink to='/teacher/notes/ajouter' className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded">
                    Ajouter des notes &gt;
            </NavLink>
        </div>
       
        {/* all exams in table format  -- filtered by search bar*/}
        {!isPending && 
        Object.keys(created_exams).filter((one_exam:any)=>(
            one_exam.toLowerCase().includes(search.toLowerCase()) 
        )).map((title:any)=>(
            
            <div key={title} className=" p-6 bg-[#f9f6f2] flex flex-col items-center ">
                    {/* title */}
                    <div className="flex justify-between w-full max-w-3xl bg-gradient-to-r from-primary-blue to-primary-beige text-white md:text-xl px-4 py-2 rounded-t-(--my-radius)">
                        <div>
                            <span className="font-semibold">Titre : {title.split('-')[0]} ---</span> 
                            <span className="ml-2 font-semibold">Classe : {title.split('-')[1]}</span>
                        </div>
                        <div>
                            <button
                                onClick={()=>{
                                    navigate('modifier',{
                                        state:{
                                            state_title: title.split('-')[0],
                                            state_classe: title.split('-')[1],
                                            state_results: created_exams[title],
                                            state_result_on: created_exams[title][0].result_on
                                        }
                                    })
                                }}
                                className=" hover:cursor-pointer bg-orange-300 text-white text-xs rounded-(--my-radius) px-3 py-1 hover:bg-orange-400 transition">
                                Modifier
                            </button>
                            <button onClick={()=>{
                                toast.promise(
                                    //need to encode in case of a space 
                                    delete_results_db(encodeURIComponent(title)),
                                    {
                                        loading: 'suppression...',
                                        success: <b>examen supprimé</b>,
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

                    {/* table */}
                    <table className="w-full md:max-w-3xl border border-collapse text-sm text-center bg-white shadow-md rounded-b-(--my-radius) overflow-hidden">
                        <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-4 py-2 border">Nom</th>
                            <th className="px-4 py-2 border">Prénom</th>
                            <th className="px-4 py-2 border">Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        
                        created_exams[title].map((one_data: any) => (
                            <tr key={one_data.result_id} className="border-b">
                                <td className="px-4 py-2 border">{one_data.student_last_name}</td>
                                <td className="px-4 py-2 border">{one_data.student_first_name}</td>
                                <td className={`px-4 py-2 border font-bold`}>{one_data.student_score}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} className="px-4 py-2 font-semibold text-right">
                            Moyenne générale
                            </td>
                            <td className="px-4 py-2 font-bold text-lg">
                            {average_by_exam[title]}
                            </td>
                        </tr>
                        </tbody>
                    </table>

            </div>
        ))
        }
        </>
    )
}