import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { use_get_classe_quiz,  } from "../../api/quiz_api";
import { use_get_all_subjects, type Subject_interface } from "../../api/subjects_api";

export default function Student_quiz(){

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const {data: classe_quiz, isLoading} = use_get_classe_quiz()

    const {data: all_subjects, isPending} = use_get_all_subjects() as {
            data: Subject_interface[],
            isPending: boolean
        }

    const all_string = "Toutes les matières"
    const [selected_subject, setSelected_subject]  = useState(all_string)

    return (
        <>

             {/* search input */}
            <div className="header_page">
                <input onChange={(e)=> setSearch(e.target.value)} placeholder="Recherche par titre" type='text' maxLength={150} className='input_alone_text'/>
                <select className="rounded-(--my-radius) bg-white px-4 py-2 text-gray-600 text-l w-60 h-12" onChange={(e)=>{
                    setSelected_subject(e.target.options[e.target.selectedIndex].text) 
                }}>
                <option value={all_string}>{all_string}</option>
                {!isPending &&  all_subjects.map(({id, name}: Subject_interface ) => (
                    <option key={id} value={id}>{name}</option>
                ))}
                        
                </select>
            </div>
            <div className="w-full flex flex-wrap justify-center gap-8 py-10 bg-[#fcf8f2]">
                {/* all quiz  loop over all of classe - search filter  apply*/}
                {!isLoading && !isPending && 
                    Object.keys(classe_quiz).filter((quiz_id: any)=> (
                        classe_quiz[quiz_id].quiz_title.toLowerCase().includes(search.toLowerCase()) &&( selected_subject === all_string ||  classe_quiz[quiz_id].quiz_subject.toLowerCase() === selected_subject.toLowerCase())
                    )).map((key:any)=> (
                        <div
                            onClick={()=> {
                                navigate('info', {
                                    state: {
                                        state_quiz_id: key,
                                    }
                                })
                            }}  
                            key={key} 
                            className=" hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 w-72 rounded-(--my-radius) overflow-hidden bg-white shadow-md">
                            <div className="bg-[#1d4b73] text-white text-center py-2 font-bold rounded-t-(--my-radius)">
                            {classe_quiz[key].quiz_title} 
                            </div>
                            <img src={`/images_icons/quiz_${classe_quiz[key].quiz_subject}.webp`} alt="quiz" className="w-full h-40 object-cover" />
                            <div className="flex justify-center font-bold p-3">
                                {classe_quiz[key].quiz_subject}
                            </div>
                        </div>
                    ))
                }
                
                
            </div>
        </>
    )
}