import { useState } from "react"
import { use_get_all_classes, type Classe_interface } from "../../api/classes_api"
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { add_quiz_db } from "../../api/quiz_api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Teacher_add_quiz(){

    const {data: all_classes, isLoading} = use_get_all_classes() as {
            data: Classe_interface[],
            isLoading: boolean
    }

    const navigate = useNavigate()

    const [quiz_title, setQuiz_title] = useState('')
    const [quiz_description, setQuiz_description] = useState('')

    const [chosen_classes, setChosen_classes] = useState<string[]>([])

    const [question, setQuestion] = useState('')

    const [question_number, setQuestion_number] = useState(1)

    const [responses, setResponses] = useState([
        {text: "", is_answer: false},
        {text: "", is_answer: false},
        {text: "", is_answer: false},
        {text: "", is_answer: false}
    ])

    const [all_data, setAll_data] = useState({})

    // update response state (text)
    const update_responses_text = (index: number, new_text: string) => {
        setResponses((prev)=> 
            prev.map((r, i)=> (i === index ? {...r, text: new_text} : r))
        )
    }

    // update response state (is_answer)
    const update_responses_is_answer = (index: number, is_answer: boolean) => {
        setResponses((prev)=>
            prev.map((r,i)=> (i === index ? {...r, is_answer: is_answer}: r ))
        )
    }

    const all_string = "Choisir classe(s)"

    //make post request to backend
    const mutation = useMutation({
        mutationFn: add_quiz_db,
        onSuccess: ()=>{
            toast.success("Quiz ajouté !", {style: {
                padding: '16px',
                fontSize: '20px'
            },})
            //navigate('/teacher/quiz')
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
    return(
        <>
         {/*header */}
            <Toaster position="top-right"/>
            <div className="mt-5 flex justify-between mb-6 w-full border-b-4 border-primary-blue pb-4 ">
                <input onChange={(e)=> setQuiz_title(e.target.value)} placeholder="Titre du quiz" type='text' maxLength={150} className='input_alone_text'/>
                <button 
                onClick={()=>{
                   //checking if values correct to be send 
                    if(Object.keys(all_data).length == 0 || quiz_title == "" || chosen_classes.length == 0){
                         toast.error("Pas de question sauvegardée ou titre manquant ou pas de classe assignée", {style: {
                            padding: '16px',
                            fontSize: '20px'
                        },})
                    }else{
                         //send all to add into db
                        mutation.mutate({title:quiz_title, description: quiz_description, classes: chosen_classes, questions_responses:all_data })
                    }
                }}
                className="mb-6 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-(--my-radius)">
                        Valider la création du quiz &gt;
                </button>
            </div>
            <div className="w-335 min-h-screen bg-[#fcf8f2] p-6 space-y-6 font-sans">

                {/* classe and description */}
                {!isLoading && 
                <>
                    <div className="flex items-center gap-4">
                        <select className="input_alone_other" onChange={(e) => {
                            //add to chosen classes
                            if(!chosen_classes.includes(e.target.value)){
                                setChosen_classes((prev:string[]) => [...prev, String(e.target.value)])
                            }
                        }}>
                            <option value={all_string}>{all_string}</option>
                        {all_classes.map(({id, name}: Classe_interface ) => (
                            //loop over all classes
                            <option key={id} value={name}>{name}</option>
                        ))}
                        </select>
                        {chosen_classes.map((classe:string)=>(
                            <h1 key={classe} className="flex items-center gap-2">{classe} 
                            <FaTimes
                            onClick={()=> {
                                //remove from chosen_classes
                                setChosen_classes((prev:string[])=> prev.filter((one_classe: string)=> one_classe !== classe))
                            }} 
                            className="hover:cursor-pointer text-red-400 text-xl"/>
                            </h1>
                            
                        ))}
                    </div>
                    <textarea placeholder="Description" className='input_alone_other' onChange={(e)=> setQuiz_description(e.target.value)}></textarea>
                </>
                }
                {/* Question */}
                <div>
                    <label className="text-primary-blue font-semibold text-lg mr-2">
                    Question {question_number} :
                    </label>
                    <input
                    type="text"
                    className="input_alone_text !w-190"
                    placeholder="Question"
                    onChange={(e)=> setQuestion(e.target.value)}
                    />
                </div>

                {/* Responses */}
                <div className="grid grid-cols-2 gap-10 mt-10">
                    {/* answer 1*/}
                    <div className="flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm">
                    <input
                        type="text"
                        className="input_alone_text !w-130"
                        placeholder="Réponse 1"
                        onChange={(e)=> update_responses_text(0, e.target.value)}
                    />
                    <input 
                        type="checkbox" 
                        className="w-5 h-5"
                        onChange={(e)=> update_responses_is_answer(0, e.target.checked)}     
                    />
                    </div>

                    {/* answer 2*/}
                    <div className="flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm">
                    <input
                        type="text"
                        className="input_alone_text !w-130"
                        placeholder="Réponse 2"
                        onChange={(e)=> update_responses_text(1, e.target.value)}
                    />
                    <input 
                        type="checkbox" 
                        className="w-5 h-5" 
                        onChange={(e)=> update_responses_is_answer(1, e.target.checked)}    
                    />
                    </div>

                    {/* answer 3*/}
                    <div className="flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm">
                    <input
                        type="text"
                        className="input_alone_text !w-130"
                        placeholder="Réponse 3"
                        onChange={(e)=> update_responses_text(2, e.target.value)}
                    />
                    <input 
                        type="checkbox" 
                        className="w-5 h-5" 
                        onChange={(e)=> update_responses_is_answer(2, e.target.checked)}    
                    />
                    </div>

                    {/* answer 4 */}
                    <div className="flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm">
                    <input
                        type="text"
                        className="input_alone_text !w-130"
                        placeholder="Réponse 4"
                        onChange={(e)=> update_responses_text(3, e.target.value)}
                    />
                    <input 
                        type="checkbox" 
                        className="w-5 h-5" 
                        onChange={(e)=> update_responses_is_answer(3, e.target.checked)}    
                    />
                    </div>
                </div>
                <button 
                onClick={()=>{
                    //checking : question not empty, no responses, no response is an answer
                    if(question == "" || responses.every((r)=> r.text == "") || responses.every((r)=> r.is_answer == false)){
                        toast.error("Question vide ou pas de réponse(s) ou pas de réponse(s) valide", {style: {
                            padding: '16px',
                            fontSize: '20px'
                        },})
                    }else{
                        //on click add question and responses to all data 
                        setAll_data((prev:any) => ({...prev, [question]: responses}))
                        
                        //empty every state responses 
                        setResponses([
                            {text: "", is_answer: false},
                            {text: "", is_answer: false},
                            {text: "", is_answer: false},
                            {text: "", is_answer: false}
                        ])
                        toast.success(`Question ${question_number} ajoutée`, {style: {
                            padding: '16px',
                            fontSize: '20px'
                        },})
                        setQuestion_number(question_number+1)
                    }
                    
                }}
                className="hover:cursor-pointer mb-6 bg-primary-blue hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-(--my-radius)">
                        Ajouter la question &gt;
                </button>
                <ul>
                    {Object.keys(all_data).map((one_question:any, i: number) => (
                        <li>Question {i+1} : {one_question} </li>
                    ))}
                </ul>
            </div>
        </>
    )
}