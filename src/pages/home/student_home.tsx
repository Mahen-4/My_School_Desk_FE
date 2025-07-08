

export default function Student_home(){
    return(
        <div className="flex flex-col w-340 gap-30">
            <div className="w-auto h-50 bg-primary-blue">TOP</div>
            <div className="flex justify-center gap-60">
                <div className="bg-primary-blue p-7 mt-15 rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/note_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Notes</h2>
                </div>
                <div className="bg-primary-blue p-7 mt-15 rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/homework_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Devoirs</h2>
                </div>
                <div className="bg-primary-blue p-7 mt-15 rounded-(--my-radius) text-center hover:bg-primary-blue-hover">
                    <img src="/images_icons/quiz_icon.png" alt="Logo" />
                    <h2 className="text-primary-beige font-bold mt-5 text-2xl ">Quiz</h2>
                </div>
            </div>
        </div>
    )
}