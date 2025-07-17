import { useEffect, useState } from 'react';
import { use_get_all_classes } from "../../api/classes_api";
import type { Classe_interface } from '../../api/classes_api';
import { edit_homework_db } from '../../api/homeworks_api';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";


export default function Teacher_edit_homeworks(){

    
    const { state } = useLocation(); //get state 

   
    if (!state) { //if no state
        return <p>Pas de données fournies</p>;
    }

    const change_date_format = (dateStr: string) => {
            if (!dateStr) return '';
            const [day, month, year] = dateStr.split('-');
            return `${year}-${month}-${day}`;
    };

    const { state_homework_id, state_classe_name,  state_description, state_due_date } = state; // get state data

    const [selected_classe_name, setSelected_classe_name]  = useState(state_classe_name)
    const [due_date, setDue_date]: any = useState(change_date_format(state_due_date));
    const [description, setDescription] = useState(state_description);


    const {data: all_classes, isLoading} = use_get_all_classes() as {
            data: Classe_interface[],
            isLoading: boolean
        }
    
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: edit_homework_db, //make request
        onSuccess: () => {
            toast.success("devoir modifié ! ", {style: {
            padding: '16px',
            fontSize: '20px'
            },})
            navigate('/teacher/devoirs')
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
    

    const edit_homework = () => {
        const today = new Date()
        // checking of data 
        if (description == '' || new Date(due_date) < today ){
            toast.error("Aucune description ou aucune classe selectionné ou date invalide", {style: {
                padding: '16px',
                fontSize: '20px'
            },})
        }
        //check if edit was made 
        else if (description == state_description && due_date == state_due_date && selected_classe_name == state_classe_name){
            toast.error("Aucune modification a été faite", {style: {
                padding: '16px',
                fontSize: '20px'
            },})
        }
        else{
            mutation.mutate({homework_id: state_homework_id, description: description, due_date: new Date(due_date).toISOString().split('T')[0], classe: selected_classe_name })
        }
    }

    
    
    return(
        <>
            <Toaster position='top-right'/>
            {/* get all classes from db */}
            { !isLoading && 
                <div className="header_page">
                    <select className="input_alone_other" onChange={(e) => {
                      setSelected_classe_name(e.target.options[e.target.selectedIndex].text) 
                    } 
                        }>
                    {all_classes.map(({id, name}: Classe_interface ) => (
                        <option key={id} value={id} selected={name == selected_classe_name}>{name}</option>
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
                <div className="w-full mt-5">
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
                    onClick={edit_homework}
                    className="hover:cursor-pointer w-50 mt-6 bg-orange-300 hover:bg-orange-400 text-white font-semibold px-6 py-2 rounded-(--my-radius)"
                >
                    Modifier
                </button>
            </div>
        </>
        
    )
}