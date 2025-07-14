import { useLocation, useNavigate } from "react-router-dom";
import { get_quiz_info } from "../../api/quiz_api";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

export default function Student_quiz_info(){

    const { state } = useLocation(); //get state 
    const navigate = useNavigate()

   
    if (!state) { //if no state
        return <p>Pas de données fournies</p>;
    }

    const { state_quiz_id, state_quiz_subject} = state; // get state data

    const [quiz_info, setQuiz_info] = useState<any>(null)

    //make post request to backend
    const mutation = useMutation({
        mutationFn: get_quiz_info,
        onSuccess: (data)=>{
            setQuiz_info(data)
        },
        onError: (err: any) => {
            // if response
            if (err.response && err.response.data) {   
                toast.error(err.response.data.error, {style: {
                padding: '16px',
                fontSize: '20px'
                },})
            } 
            else {
                toast.error("Erreur inconnue", {style: {
                    padding: '16px',
                    fontSize: '20px'
                },})
            }   
        }
    })

    useEffect(()=>{
        mutation.mutate(state_quiz_id)
    },[])


    return (
        <>
            {quiz_info && state && 
                <div>
                    <div className="header_page text-primary-blue">
                        <h1>Titre : <span className="font-bold">{quiz_info[state_quiz_id].quiz_title}</span></h1>
                        <h1>Matière : <span className="font-bold">{quiz_info[state_quiz_id].quiz_teacher_subject}</span></h1>
                    </div>
                    <div className=" p-4">
                        <div className="w-full mx-auto flex justify-center mt-4">
                            {/* Card principale */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2">
                            
                            {/* Contenu */}
                            <div className="p-6 flex items-center gap-3">
                                 <img 
                                src={`/images_icons/quiz_${quiz_info[state_quiz_id].quiz_teacher_subject}.webp`} 
                                alt="Drapeau du Royaume-Uni" 
                                className="w-60 md:w-100 h-48 object-cover rounded-t-lg"
                                />
                                {/* Informations du quiz */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium">Date d'ajout:</span>
                                        <span className="ml-2">{quiz_info[state_quiz_id].quiz_added_date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium">Publié par:</span>
                                        <span className="ml-2">{quiz_info[state_quiz_id].quiz_teacher}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium">Date de la dernière tentative:</span>
                                        <span className="ml-2">{quiz_info.date_last_attempt}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium">Dernier score:</span>
                                        <span className="ml-2">{quiz_info.last_score}</span>
                                    </div>
                                </div>
                            </div>
                                
                                {/* Description */}
                                <div className="mb-6 p-6">
                                <h3 className="font-medium text-gray-900 mb-3">Description:</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {quiz_info[state_quiz_id].quiz_description}
                                </p>
                                </div>
                                
                                {/* Bouton */}
                                <div className="flex justify-end">
                                <button 
                                onClick={()=>{
                                    navigate('/student/quiz/jouer', {
                                        state: {
                                            state_quiz_id: state_quiz_id,
                                            state_quiz_title: quiz_info[state_quiz_id].quiz_title
                                        }
                                    })
                                }}
                                className="bg-primary-blue hover:bg-blue-400 hover:cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                                    Lancer le quiz
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}