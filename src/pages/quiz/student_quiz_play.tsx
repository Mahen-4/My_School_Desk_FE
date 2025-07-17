import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { add_attempt, get_quiz_questions_responses } from "../../api/quiz_api";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';
import { FaCheck, FaTimes } from "react-icons/fa";


export default function Student_quiz_play(){
    
    const { state } = useLocation(); //get state 
    const navigate = useNavigate()

    if (!state) { //if no state
        return <p>Pas de données fournies</p>;
    }

    const { state_quiz_id, state_quiz_title} = state; // get state data

    const [all_data, setAll_data] = useState<any>()
    const [all_questions, setAll_questions] = useState<string[]>([])
    const [chosen_responses, setChosen_responses] = useState<string[]>([])
    const [show_responses, setShow_responses] = useState<boolean>(false)
    const [question_number, setQuestion_number] = useState<number>(0)
    const [user_score, setUser_score] = useState<number>(0)
    
    //make post request to backend
    const mutation = useMutation({
        mutationFn: get_quiz_questions_responses,
        onSuccess: (data)=>{
            setAll_data(data)
            setAll_questions(Object.keys(data))
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

    

    //check if responses are right and show responses div 
    const check_responses = ()=>{
        if(chosen_responses.length == 0 ){
            return toast.error("Veuillez choisir une ou des réponses", {style: {
                    padding: '16px',
                    fontSize: '20px'
                },})
            
        }
        setShow_responses(true)

        //get all good responses of the question
        const good_responses_question = Object.values(all_data[all_questions[question_number]]).filter((value:any)=> value.is_answer == true ) 

        //get all good responses from user
        const good_responses_user = Object.values(all_data[all_questions[question_number]]).filter((value:any)=> value.is_answer == true && chosen_responses.includes(value.response_title))

        //get all wrong responses from user
        const wrong_responses_user = Object.values(all_data[all_questions[question_number]]).filter((value:any)=> value.is_answer == false && chosen_responses.includes(value.response_title))

        //points / good responses by user
        const points_per_good_respones = 1 / good_responses_question.length
        
        //if user have no wrong responses 
        if(wrong_responses_user.length == 0 ){
            setUser_score(user_score + (good_responses_user.length * points_per_good_respones))
        }
        
    }

    //next question 
    const next_question = ()=>{
        setShow_responses(false)
        //if there is a next question 
        if(question_number+1 < Object.keys(all_data).length){
            setQuestion_number(question_number+1)
            setChosen_responses([])
        }
        else{
            //if no question left show pop up with score 
            let pop_up_score = document.getElementById('pop_up_score')
            pop_up_score && (pop_up_score.style.display = "")
        }
        

    }

    //add attempt
    const mutation_add_attempt = useMutation({
        mutationFn: add_attempt,
        onSuccess: ()=>{
            navigate('/student/quiz')
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
        {all_data && state && 
            <div>
                <div className="header_page text-primary-blue">
                        <h1>Titre : <span className="font-bold">{state_quiz_title}</span></h1>
                        <h1>Score : <span className="font-bold">{user_score}/{Object.keys(all_data).length}</span></h1>
                        <h1>Question : <span className="font-bold"> {String(question_number+1)}/{Object.keys(all_data).length}</span></h1>
                </div>
                <div className="w-full text-center mt-50">
                    <h1 className="text-xl text-primary-blue">Question {String(question_number+1)} : <span className="font-semibold ">{all_questions[question_number]}</span></h1>
                </div>
                {/* Responses */}
                <div className="grid grid-cols-2 gap-10 mt-10 p-2">
                    {
                        //on click add to response list and if already in remove it 
                        Object.values(all_data[all_questions[question_number]]).map((values:any)=>(
                            <div key={values.response_id} 
                            
                                onClick={()=> setChosen_responses((prev:any)=> (prev.includes(values.response_title) ? prev.filter((v:any)=> v !== values.response_title) : [...prev, values.response_title]))}
                                className={chosen_responses.includes(values.response_title) ? 
                                `" hover:border-primary-blue hover:border-3 hover:cursor-pointer flex justify-between items-center border-3 border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm"` : 
                                '" hover:border-primary-blue hover:border-3 hover:cursor-pointer flex justify-between items-center border border-primary-blue rounded-(--my-radius) px-4 py-3 bg-white shadow-sm"'}>
                                <h1 className="p-2">{values.response_title}</h1>
                                {show_responses && (
                                    values.is_answer ? <FaCheck className="text-green-400"/> : <FaTimes className="text-red-400"/>
                                    
                                    ) }
                            </div>
                        ))
                    }
               </div>
               <div className="flex p-2" >
                
                {show_responses ? (
                    <button
                        onClick={()=> next_question()}
                        className="mt-10 ml-auto hover:cursor-pointer bg-primary-blue hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-(--my-radius)"
                    >Question suivante</button> 
                ):
                    <button
                        onClick={()=> check_responses()}
                        className="mt-10 ml-auto hover:cursor-pointer bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-(--my-radius)"
                    >Valider</button>
                }

               </div>
               <div id='pop_up_score' style={{'display': "none"}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-xl text-center">
                        <h2 className="text-2xl font-bold text-primary-blue mb-4">🎉 Quiz terminé !</h2>
                        <p className="text-lg text-gray-700 mb-2">
                        Quiz effectué : <span className="font-semibold">{state_quiz_title}</span>
                        </p>
                        <p className="text-xl font-bold text-green-600 mb-6">
                        Score : {user_score} / {Object.keys(all_data).length}
                        </p>
                        <button
                        onClick={()=> mutation_add_attempt.mutate({quiz_id: state_quiz_id, score:`${user_score}/${Object.keys(all_data).length}`})}
                        className="hover:cursor-pointer mt-4 px-6 py-3 bg-primary-blue text-white rounded-(--my-radius) hover:bg-blue-400 transition"
                        >
                        Finir
                        </button>
                    </div>
                    </div>
            </div>
            
            }
        </>
    )
}