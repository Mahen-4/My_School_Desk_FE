import { useLocation, useNavigate } from 'react-router-dom';

export default function Sections_home(){

    const navigate = useNavigate();
    let location = useLocation().pathname.split('/')[1]

    return(
        
        <div className="flex flex-1 flex-col w-345 gap-30">
            <div className="flex justify-center gap-60 "> {/* EACH SECTION */}
                <div onClick={() => navigate(`/${location}/notes`)} className="bg-primary-blue p-7 mt-15 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/note_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Notes</h2>
                </div>
                <div onClick={() => navigate(`/${location}/devoirs`)} className="bg-primary-blue p-7 mt-15 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/homework_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Devoirs</h2>
                </div>
                <div  onClick={() => navigate(`/${location}/quiz`)} className="bg-primary-blue p-7 mt-15 hover:cursor-pointer rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/quiz_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Quiz</h2>
                </div>
            </div>
        </div>
    )
}
