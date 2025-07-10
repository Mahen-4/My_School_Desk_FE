import React, { useEffect, useRef, useState } from 'react';
import { use_get_all_classes, type Classe_interface, type Student_full_name_interface } from '../../api/classes_api';
import { get_classe_students } from '../../api/classes_api';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

const initialStudents = [
  { id: 1, nom: 'Clifford', prenom: 'Michael', note: 12 },
  { id: 2, nom: 'Clifford', prenom: 'Michael', note: 14 },
  { id: 3, nom: 'Clifford', prenom: 'Michael', note: 16 },
  { id: 4, nom: 'Clifford', prenom: 'Michael', note: 12 },
  { id: 5, nom: 'Clifford', prenom: 'Michael', note: 14 },
  { id: 6, nom: 'Clifford', prenom: 'Michael', note: 16 },
  { id: 7, nom: 'Clifford', prenom: 'Michael', note: 1 },
];

export default function Teacher_add_results() {

    const {data: all_classes, isLoading} = use_get_all_classes() as {
                data: Classe_interface[],
                isLoading: boolean
            }
    
    

    const [exam_title, setExam_title]= useState("")
    const [all_students, setAll_students] = useState<Student_full_name_interface[]>()
    const all_string = 'Choisir une classe'

    const [students, setStudents] = useState(initialStudents);
    const [result_on, setResult_on] = useState(20);
    const [selected_classe_name, setSelected_classe_name]  = useState("")

    const [average, setAverage] = useState(0)

    const [all_results, setAll_results] = useState<{ [key: string]: number }>({});

    const mutation = useMutation({
        mutationFn: get_classe_students, //get students full names of the classe
        onSuccess: (data) => {
           setAll_students(data)
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

    // make a dict of students in the classe with a result
    useEffect(()=> {
        if(all_students){
            Object.keys(all_students).map((key:any)=> {
                all_results[key] = 0
            })
            console.log(all_results)
        }
    },[all_students])
        
  return (
    <>
    <Toaster position='top-right'/>
     {/* get all classes from db */}
        { !isLoading && 
            <div className=" flex-1 flex justify-between mb-6 w-full border-b-4 border-primary-blue pb-4">
                <input onChange={(e)=>setExam_title(e.target.value)} placeholder="Titre de l'examen" type='text' maxLength={150} className='input_alone_text'/>
                <select className="input_alone_other" onChange={(e) => {
                    setSelected_classe_name(e.target.value) 
                    //each change of classe make request to back to get students info
                    e.target.value != all_string ? mutation.mutate(e.target.value) : setAll_students([])
                } 
                    }>
                    <option value={all_string}>{all_string}</option>
                {all_classes.map(({id, name}: Classe_interface ) => (
                    <option key={id} value={name}>{name}</option>
                ))}
                </select>
            </div>
        }
        <div className="w-335 p-6 bg-[#f9f6f2] min-h-screen flex flex-col items-center space-y-6">
            {/* result on */}
            <div className="self-start text-sm">
                Notes sur : <input defaultValue={result_on} onChange={(e)=> setResult_on(Number(e.target.value))}type='number' min={1} className='input_alone_other !w-20 !h-10 '/>
            </div>

            {/* title */}
            <div className="w-full max-w-3xl bg-gradient-to-r from-primary-blue to-primary-beige text-white text-xl px-4 py-2 rounded-t-(--my-radius)">
                <span className="font-semibold">Titre :</span> {exam_title} 
                <span className="ml-2 font-semibold">Classe :</span> {selected_classe_name}
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
                { all_students && 
                
                Object.keys(all_students || []).map((key: any) => (
                    <tr key={key} className="border-b">
                    <td className="px-4 py-2 border">{all_students[key].last_name}</td>
                    <td className="px-4 py-2 border">{all_students[key].first_name}</td>
                    <td className="px-4 py-2 border">
                        <select
                        onChange={(e)=>{
                            // clone dict et update
                            const updated = {
                                ...all_results,
                                [key]: Number(e.target.value),
                            };
                            setAll_results(updated)

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
                    <td className="px-4 py-2 font-semibold">
                    {average}/{result_on}
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Bouton */}
            <button className="bg-green-400 hover:bg-green-500 text-white font-medium px-6 py-2 rounded-(--my-radius)    shadow">
                Valider
            </button>
        </div>
    </>
  );
}
