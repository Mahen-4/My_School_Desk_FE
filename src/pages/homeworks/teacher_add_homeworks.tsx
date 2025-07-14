import { useState } from 'react';
import { use_get_all_classes } from "../../api/classes_api";
import type { Classe_interface } from '../../api/classes_api';
import { add_homework_db } from '../../api/homeworks_api';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_add_homeworks(){

    const [selected_classe_name, setSelected_classe_name]  = useState("")
    const [due_date, setDue_date]: any = useState('');
    const [description, setDescription] = useState('');

    const {data: all_classes, isLoading} = use_get_all_classes() as {
            data: Classe_interface[],
            isLoading: boolean
        }
   
    const mutation = useMutation({
        mutationFn: add_homework_db, //make request
        onSuccess: () => {
            toast.success("devoir ajouté ! ", {style: {
            padding: '16px',
            fontSize: '20px'
            },})
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
    
    const add_homework = () => {
        const today = new Date()
        // checking of data 
        if (description == '' || selected_classe_name == 'Choisir une classe' || new Date(due_date) < today ){
            toast.error("Aucune description ou aucune classe selectionné ou date invalide", {style: {
                padding: '16px',
                fontSize: '20px'
            },})
        }else{
            mutation.mutate({description: description, due_date: new Date(due_date).toISOString().split('T')[0], classe: selected_classe_name })
        }
    }

    return(
        <>
            <Toaster position='top-right'/>
            {/* get all classes from db */}
            { !isLoading && 
                <div className="header_page">
                    <select className="input_alone_other" onChange={(e) => {
                      setSelected_classe_name(e.target.value) 
                    } 
                        }>
                        <option value='Choisir une classe'>Choisir une classe</option>
                    {all_classes.map(({id, name}: Classe_interface ) => (
                        <option key={id} value={name}>{name}</option>
                    ))}
                    </select>
                </div>
            }


            <div className="w-full flex flex-col p-4">
                {/* Date picker */}
                <div>
                    <label>A rendre pour le : </label>
                    <input
                        type="date"
                        value={due_date}
                        onChange={(e) => setDue_date(e.target.value)}
                        className="input_alone_other"
                    />
                </div>
                

                {/* Container */}
                <div className="w-full mt-5 ">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-blue to-primary-beige text-white px-6 py-3 rounded-t-(--my-radius) font-semibold text-lg">
                    Pour : {selected_classe_name}
                    </div>

                    {/* Textarea */}
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="consigne ici"
                    rows={6}
                    className="w-full bg-white border border-gray-300 rounded-b-(--my-radius) p-4 outline-none resize-none"
                    ></textarea>
                </div>

                {/* Submit button */}
                <button
                    onClick={add_homework}
                    className="hover:cursor-pointer w-50 mt-6 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-(--my-radius)"
                >
                    Valider
                </button>
            </div>
        </>
        
    )
}