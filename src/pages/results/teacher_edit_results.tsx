import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { edit_results_db } from '../../api/results_api';


export default function Teacher_edit_results() {


    const { state } = useLocation(); //get state 
   
    if (!state) { //if no state
        return <p>Pas de données fournies</p>;
    }

    const { state_title, state_classe,  state_results, state_result_on } = state; // get state data
    
    const [exam_title, setExam_title]= useState(state_title)

    const [result_on, setResult_on] = useState(state_result_on);

    const [average, setAverage] = useState(0)

    const [all_results, setAll_results] = useState<{ [key: string]: number }>({});

    //get average of the exams before editing
    useEffect(()=> {
        Object.values(state_results).forEach((result: any)=> {
            all_results[result.result_id] = result.student_score
            let sum_array = Object.values(all_results).reduce((acc: number, val: any) => acc + val, 0)
            let avg = sum_array / Object.keys(all_results).length
            setAverage(avg)
        })
    },[])

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: edit_results_db, //edit results request
        onSuccess: () => {
            toast.success("Résultats modifiés", {style: {
            padding: '16px',
            fontSize: '20px'
            },})
            navigate('/teacher/notes')
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

    return (
    <>
    <Toaster position='top-right'/>
     {/* top with title field and classe indication */}
        { state && 
            <div className="header_page">
                <input defaultValue={state_title} onChange={(e)=>setExam_title(e.target.value)} placeholder="Titre de l'examen" type='text' maxLength={150} className='input_alone_text'/>
                <h2>Classe : <span className='text-xl text-primary-blue font-bold'>{state_classe}</span></h2>
            </div>
        }


        <div className="w-full p-6 bg-[#f9f6f2] min-h-screen flex flex-col items-center space-y-6">
            {/* result on */}
            <div className="self-start text-sm">
                Notes sur : <input defaultValue={result_on} onChange={(e)=> setResult_on(Number(e.target.value))}type='number' min={1} className='input_alone_other !w-20 !h-10 '/>
            </div>

            {/* title */}
            <div className="w-full max-w-3xl bg-gradient-to-r from-primary-blue to-primary-beige text-white text-xl px-4 py-2 rounded-t-(--my-radius)">
                <span className="font-semibold">Titre :</span> {exam_title} 
                <span className="ml-2 font-semibold">Classe :</span> {state_classe}
            </div>

            {/* table */}
            <table className="w-full max-w-3xl border border-collapse text-sm text-center bg-white shadow-md rounded-b-(--my-radius) overflow-hidden">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 border">Nom</th>
                    <th className="px-4 py-2 border">Prénom</th>
                    <th className="px-4 py-2 border">Note</th>
                </tr>
                </thead>
                <tbody>
                {/* loop over all results  */}
                { state && 
                Object.values(state_results || []).map((result: any) => (
                    <tr key={result.result_id} className="border-b">
                    <td className="px-4 py-2 border">{result.student_last_name}</td>
                    <td className="px-4 py-2 border">{result.student_first_name}</td>
                    <td className="px-4 py-2 border">
                        <select
                        defaultValue={result.student_score}
                        onChange={(e)=>{
                            // clone dict et update
                            const updated = {
                                ...all_results,
                                [result.result_id]: Number(e.target.value),
                            };
                            setAll_results(updated)
                            
                            //get average
                            let sum_array = Object.values(updated).reduce((acc: number, val: any) => acc + val, 0)
                            let avg = sum_array / Object.keys(updated).length
                            setAverage(avg)

                        }}   
                        className="border border-gray-300 rounded px-1 py-0.5 text-sm">
                            {/*  make a select - option going from 1 to result_on*/}
                        {Array.from({ length: result_on + 1 }, (_, i) => (
                            <option key={i} value={i}>
                            {i}
                            </option>
                        ))}
                        </select>
                    </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={2} className="px-4 py-2 font-semibold text-right">
                    Moyenne générale
                    </td>
                    <td className="px-4 py-2 font-semibold text-lg">
                    {average}/{result_on}
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Bouton */}
            <button 
            onClick={()=>{
                //values checking before mutation
                if(exam_title == '' ){
                   toast.error("Champs titre vide", {style: {
                        padding: '16px',
                        fontSize: '20px'
                    },}) 
                }else{
                    mutation.mutate({title:exam_title, result_on: result_on, all_results:all_results})
                }
            }}
            className="hover:cursor-pointer md:ml-140 bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-(--my-radius)    shadow">
                Modifier
            </button>
        </div>
    </>
  );
}
