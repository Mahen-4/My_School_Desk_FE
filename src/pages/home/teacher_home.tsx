import Sections_home from "../../components/main_components/sections_home";
import { use_current_user } from "../../api/auth_api";

export default function Teacher_home(){

    const { data: user, isLoading, isError } = use_current_user();

    return(
        <div className="flex-1 flex-col"> {/* TOP SECTION */}
            <div className=" flex items-center justify-left md:w-335 h-50 border-b-4 border-primary-blue">
                <div className="flex items-center space-x-4 ml-30">
                    {isLoading ? (
                        <p>Chargement....</p>
                    ):
                        <>
                            <div className="flex items-center justify-center w-35 h-35 bg-primary-blue rounded-(--my-radius)">
                                <h1 className="mb-4 text-8xl font-semibold text-primary-beige">{user?.last_name.charAt(0)}</h1>
                            </div>
                            <div>
                                <h1 className="font-semibold text-primary-blue text-xl">{user.last_name.toUpperCase()} {user.first_name}</h1>
                                <p>Matière : {user.subject}</p>
                                <p>Email : {user.email}</p>
                            </div>
                        </>
                    }

                </div>
            </div>
            <Sections_home />
        </div>
    )
}