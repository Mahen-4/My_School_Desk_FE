import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { delete_quiz_db, use_get_quiz_created } from "../../api/quiz_api";
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_quiz(){

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const {data: quiz_created, isLoading} = use_get_quiz_created()

    return (
        <>
            <Toaster position="top-right"/>

             {/* search input */}
            <div className="mt-5 flex justify-between mb-6 w-full border-b-4 border-primary-blue pb-4">
                <input onChange={(e)=> setSearch(e.target.value)} placeholder="Recherche par titre" type='text' maxLength={150} className='input_alone_text'/>
                <NavLink to='/teacher/quiz/ajouter' className="mb-6 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-(--my-radius)">
                        Ajouter un quiz &gt;
                </NavLink>
            </div>
            <div className="w-335 flex justify-center gap-8 py-10 bg-[#fcf8f2]">
                {/* all quiz  loop over all created*/}
                {!isLoading && 
                    Object.keys(quiz_created).filter((quiz_id: any)=> (
                        quiz_created[quiz_id].quiz_title.toLowerCase().includes(search.toLowerCase()) 
                    )).map((key:any)=> (
                        <div  key={key} className="w-72 rounded-(--my-radius) overflow-hidden bg-white shadow-md">
                            <div className="bg-[#1d4b73] text-white text-center py-2 font-bold rounded-t-(--my-radius)">
                            {quiz_created[key].quiz_title} 
                            </div>
                            <div className="flex gap-2 bg-primary-blue border border-white text-white justify-center font-semibold">
                                Pour : 
                                {quiz_created[key].classes.map((key:any)=>(
                                    <p>{key} - </p>
                                ))}
                            </div>
                            <img src="/images_icons/quiz_anglais.webp" alt="quiz" className="w-full h-40 object-cover" />
                            <div className="flex justify-between p-3">
                                <button 
                                onClick={()=>{
                                    navigate('modifier', {
                                        state: {
                                            state_quiz_id: key,
                                            state_quiz_title: quiz_created[key].quiz_title,
                                            state_quiz_classes: quiz_created[key].classes,
                                            state_quiz_description:  quiz_created[key].quiz_description
                                        }
                                    })
                                }}
                                className="hover:cursor-pointer bg-orange-300 hover:bg-orange-400 text-white font-semibold py-1 px-3 rounded-(--my-radius)">
                                    Modifier
                                </button>
                                <button 
                                onClick={()=>{
                                    //delete quiz only
                                    toast.promise(
                                        delete_quiz_db(key),
                                        {
                                            loading: 'suppression...',
                                            success: <b>Question supprimée</b>,
                                            error: <b>Erreur lors de la suppression</b>,
                                        }
                                        );
                                    window.location.reload();
                                }}
                                className="hover:cursor-pointer bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-3 rounded-(--my-radius)">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                }
                
                
            </div>
        </>
    )
}