import { useEffect, useState } from "react"
import { use_get_student_results } from "../../api/results_api"
import { use_get_all_subjects, type Subject_interface } from "../../api/subjects_api";

export default function Student_results(){


    const {data: all_subjects, isLoading} = use_get_all_subjects() as {
            data: Subject_interface[],
            isLoading: boolean
        }
    const {data: student_results, isPending} = use_get_student_results()
    
    const all_string = "Toutes les matières"

    const [selected_subject, setSelected_subject]  = useState(all_string)

    let scores_by_subject: any= {}
    const [average_by_subject, setAverage_by_subject] = useState<{ [key: string]: number }>({})
    const [overall_average, setOverall_average] = useState(0)

    //get average by subject 
    useEffect(()=>{
        if(!isPending){
            //get all scores by subject and turn into /20 scores
            Object.keys(student_results).forEach((subject:any)=>{
                scores_by_subject[subject] = []
                student_results[subject].forEach((one_result:any)=>{
                    scores_by_subject[subject].push((one_result.score/one_result.result_on) * 20) // turn score into /20 score
                })
            })
            let update = {}
            //loop over all score in a each subject and get average 
            Object.keys(scores_by_subject).forEach((subject:any)=>{
                let sum_array = Object.values(scores_by_subject[subject]).reduce((acc: number, val: any) => acc + val, 0)
                update = {...average_by_subject, [subject]: sum_array / Object.values(scores_by_subject[subject]).length}
                setAverage_by_subject(update)
            })

            // get overall average 
            let array_sum = Object.values(update).reduce((acc: number, val: any) => acc + val, 0)
            setOverall_average(array_sum / Object.values(update).length)
        }
    },[isPending])


    return(
        <>
        {/* filter subjects input */}
        {!isLoading && 
            <div className="flex justify-between items-center mb-6 w-335 border-b-4 border-primary-blue pb-4">
                <span>Moyenne générale :  &nbsp;
                    <span className="font-bold text-lg text-primary-blue">
                        {overall_average}/20
                    </span>
                </span>

                <select className="rounded-(--my-radius) bg-white px-4 py-2 text-gray-600 text-l w-60 h-12" onChange={(e)=>{
                    setSelected_subject(e.target.options[e.target.selectedIndex].text) 
                }}>
                    <option value={all_string}>{all_string}</option>
                {all_subjects.map(({id, name}: Subject_interface ) => (
                    <option key={id} value={id}>{name}</option>
                ))}
                
                </select>
            </div>
        }
       
        {/* all result by subject in table format  -- filtered by subject*/}
        {!isPending && 
        Object.keys(student_results).filter((subject:any)=>(
            selected_subject === all_string || subject === selected_subject
        )).map((one_subject:any)=>(
            
            <div key={one_subject} className="w-335 p-6 bg-[#f9f6f2] flex flex-col items-center ">
                    {/* title - subject */}
                    <div className="flex justify-between w-full max-w-3xl bg-gradient-to-r from-primary-blue to-primary-beige text-white text-xl px-4 py-2 rounded-t-(--my-radius)">
                        <div>
                            <span className="font-semibold">{one_subject}</span> 
                        </div>
                    </div>

                    {/* table */}
                    <table className="w-full max-w-3xl border border-collapse text-sm text-center bg-white shadow-md rounded-b-(--my-radius) overflow-hidden">
                        <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-4 py-2 border">Date d'ajout</th>
                            <th className="px-4 py-2 border">Titre</th>
                            <th className="px-4 py-2 border">Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        
                        student_results[one_subject].map((one_data: any) => (
                            <tr key={one_data.result_added_date} className="border-b">
                                <td className="px-4 py-2 border">{one_data.result_added_date}</td>
                                <td className="px-4 py-2 border">{one_data.title}</td>
                                <td className={`px-4 py-2 border font-bold`}>{one_data.score}/{one_data.result_on}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} className="px-4 py-2 font-semibold text-right">
                            Moyenne générale
                            </td>
                            <td className="px-4 py-2 font-bold text-lg">
                            {average_by_subject[one_subject]}/20
                            </td>
                        </tr>
                        </tbody>
                    </table>

            </div>
        ))
        }
        </>
    )
}