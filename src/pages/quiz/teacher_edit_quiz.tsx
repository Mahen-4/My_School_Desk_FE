import { useEffect, useState } from "react"
import { use_get_all_classes, type Classe_interface } from "../../api/classes_api"
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { add_quiz_db, delete_question_db, edit_quiz_db, get_quiz_info, get_quiz_questions_responses } from "../../api/quiz_api";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_edit_quiz(){

    const { state } = useLocation(); //get state 

   
    if (!state) { //if no state
        return <p>Pas de données fournies</p>;
    }

    const { state_quiz_id, state_quiz_title, state_quiz_classes, state_quiz_description } = state; // get state data

    const {data: all_classes, isLoading} = use_get_all_classes() as {
            data: Classe_interface[],
            isLoading: boolean
    }

    const navigate = useNavigate()

    const [quiz_title, setQuiz_title] = useState(state_quiz_title)
    const [quiz_description, setQuiz_description] = useState(state_quiz_description)

    const [chosen_classes, setChosen_classes] = useState<string[]>(state_quiz_classes)

    const [all_data, setAll_data] = useState<any>()

    const all_string = "Choisir classe(s)"

    //make post request to backend
    const mutation = useMutation({
        mutationFn: get_quiz_questions_responses,
        onSuccess: (data)=>{
            setAll_data(data)
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
    //get quiz data questions and responses
    useEffect(()=>{
        mutation.mutate(state_quiz_id)
    },[])

    const update_all_data_questions = (index: number, new_value: string)=>{
        
        const keys = Object.keys(all_data); //get all keys
        const old_key = keys[index]; // get old key 
        
        if(old_key){
            setAll_data((prev:any)=>{
                const updated = {...prev} //get prev dict
                updated[new_value] = updated[old_key] // add new title with existing old key value
                delete updated[old_key] // delete old key
                return updated
            })
        }
    }

    const update_all_data_responses_title = (index_question: number, index_response: number, new_value: string)=>{
        const keys = Object.keys(all_data); //get all keys
        const key_question = keys[index_question]; // get key 

        if (key_question){
            setAll_data((prev:any)=>{
                const updated = {...prev}
                updated[key_question][index_response]['response_title'] = new_value // set new responses
                return updated
            })
        }
    }

    const update_all_data_responses_is_answer = (index_question: number, index_response: number, is_answer: boolean)=>{
        const keys = Object.keys(all_data); //get all keys
        const key_question = keys[index_question]; // get key 

        if (key_question){
            setAll_data((prev:any)=>{
                const updated = {...prev}
                updated[key_question][index_response]['is_answer'] = is_answer // set new responses
                return updated
            })
        }
    }

    //make post request to backend
    const mutation_edit = useMutation({
        mutationFn: edit_quiz_db,
        onSuccess: ()=>{
            toast.success("Quiz modifié", {style: {
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


    return (
        <>
            {/*header */}
            <Toaster position="top-right"/>
            <div className="mt-5 flex justify-between mb-6 w-full border-b-4 border-primary-blue pb-4 ">
                <input 
                    defaultValue={state_quiz_title}
                    onChange={(e) => setQuiz_title(e.target.value)} 
                    placeholder="Titre du quiz" 
                    type='text' 
                    maxLength={150} 
                    className='input_alone_text'
                />
                <button 
                    onClick={()=>{
                        //check if data correct to be send to backend
                        if(Object.keys(all_data).length == 0 || quiz_title == "" || chosen_classes.length == 0){
                            toast.error("Pas de question sauvegardée ou titre manquant ou pas de classe assignée", {style: {
                                padding: '16px',
                                fontSize: '20px'
                            },})
                        }else{
                            mutation_edit.mutate({quiz_id:state_quiz_id, title:quiz_title, description: quiz_description, classes: chosen_classes, questions_responses:all_data })
                        }

                    }}
                    className="mb-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-(--my-radius)"
                >
                    Modifier le quiz &gt;
                </button>
            </div>
            <div className="w-335 min-h-screen bg-[#fcf8f2] p-6 space-y-6 font-sans">

                {/* classe and description */}
                {!isLoading && 
                    <div>
                        <div className="flex items-center gap-4">
                            <select className="input_alone_other" onChange={(e) => {
                                //add to chosen classes
                                if(!chosen_classes.includes(e.target.value)){
                                    setChosen_classes((prev: string[]) => [...prev, String(e.target.value)])
                                }
                            }}>
                                <option value={all_string}>{all_string}</option>
                                {all_classes.map(({id, name}: Classe_interface) => (
                                    //loop over all classes
                                    <option key={id} value={name}>{name}</option>
                                ))}
                            </select>
                            {state_quiz_classes && chosen_classes.map((classe: string) => (
                                <h1 key={classe} className="flex items-center gap-2">
                                    {classe} 
                                    <FaTimes
                                        onClick={() => {
                                            //remove from chosen_classes
                                            setChosen_classes((prev: string[]) => prev.filter((one_classe: string) => one_classe !== classe))
                                        }} 
                                        className="hover:cursor-pointer text-red-400 text-xl"
                                    />
                                </h1>
                            ))}
                        </div>
                        <textarea 
                            defaultValue={state_quiz_description}
                            placeholder="Description" 
                            className='input_alone_other mt-10' 
                            onChange={(e) => setQuiz_description(e.target.value)}
                        />
                    </div>
                }
                
                {/* Question  */}
                {all_data && Object.entries(all_data).map(([question_title, responses]: any, index) => (
                    <div key={question_title}>
                        <div className="flex items-center gap-4">
                            <label className="text-primary-blue font-semibold text-lg mr-2">
                                Question {index+1} :
                            </label>
                            <input
                                defaultValue={question_title}
                                type="text"
                                className="input_alone_text !w-190"
                                placeholder="Question"
                                onBlur={(e)=> {
                                    update_all_data_questions(index, e.target.value)
                                }
                            }
                            />
                            <FaTimes
                                onClick={() => {
                                    //delete question only
                                    toast.promise(
                                        delete_question_db(all_data[question_title][0]['question_id']),
                                        {
                                            loading: 'suppression...',
                                            success: <b>Question supprimée</b>,
                                            error: <b>Erreur lors de la suppression</b>,
                                        }
                                        );
                                    window.location.reload();
                                }} 
                                className="hover:cursor-pointer text-red-400 text-xl"
                            />
                        </div>
                        <div>
                            {/** loop through response */}
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                {responses.map((response: any, index_response: number) => (
                                    <div key={index_response} className="flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm">
                                        <input
                                            defaultValue={response.response_title}
                                            type="text"
                                            className="input_alone_text !w-130"
                                            placeholder="Réponse"
                                            onBlur={(e)=> update_all_data_responses_title(index,index_response,e.target.value)}
                                        />
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5"
                                            defaultChecked={response.is_answer}
                                            onChange={(e)=> update_all_data_responses_is_answer(index, index_response, e.target.checked)}     
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )

}