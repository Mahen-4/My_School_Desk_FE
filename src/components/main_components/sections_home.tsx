import { useLocation, useNavigate } from 'react-router-dom';

export default function Sections_home(){

    const navigate = useNavigate();
    let location = useLocation().pathname.split('/')[1]

    return(
        
        <div className=" flex-col md:w-full  md:gap-8">
            <div className="flex flex-row flex-wrap items-center gap-10 justify-center md:gap-10 items-center "> {/* EACH SECTION */}
                <div onClick={() => navigate(`/${location}/notes`)} className="bg-primary-blue p-7 mt-4 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/note_icon.png" alt="Logo" className='mx-auto' />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Notes</h2>
                </div>
                <div onClick={() => navigate(`/${location}/devoirs`)} className="bg-primary-blue p-7 mt-4 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/homework_icon.png" alt="Logo" className='mx-auto'/>
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Devoirs</h2>
                </div>
                <div  onClick={() => navigate(`/${location}/quiz`)} className="bg-primary-blue p-7 mt-4 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/quiz_icon.png" alt="Logo" className='mx-auto'/>
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Quiz</h2>
                </div>
            </div>
        </div>
    )
}
