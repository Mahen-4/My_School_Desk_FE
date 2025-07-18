// src/components/Layout.tsx
import { useMutation } from '@tanstack/react-query';
import { FaHome, FaBook, FaClipboardList, FaQuestionCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { logout, use_current_user } from './api/auth_api';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { use_get_all_homeworks_created_teacher, use_get_last_homeworks, use_get_last_homeworks_created_teacher } from './api/homeworks_api';
import { use_get_last_results } from './api/results_api';
import { useEffect, useState } from 'react';

export default function App_layout() {
  
  const navigate = useNavigate()


  let user_type = useLocation().pathname.split('/')[1] //get student or teacher
  let location = useLocation().pathname.split('/')[2] // get current location


  const { data: user } = use_current_user();
  const {data: last_homeworks, isLoading} = use_get_last_homeworks()
  const {data: last_results, isPending} = use_get_last_results()
  const {data: last_homeworks_created, isFetching} = use_get_last_homeworks_created_teacher()

  const should_fetch_user_type = sessionStorage.getItem("user_type");

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: ()=> navigate('/'),
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);


  return (
    <div className="flex  min-h-screen">
      <Toaster position='top-right' />
      {/* Sidebar */}
      {/* Bouton burger  mobile */}
      <button
        onClick={toggleSidebar}
        className="sm:block md:hidden p-4 text-primary-blue text-2xl fixed top-0 left-0 z-50"
      >
        <FaBars />
      </button>

      {/* Overlay  in mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:block md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-md flex flex-col justify-between px-4 py-6 fixed h-screen z-50 
        transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 sm:relative sm:block`}>

        <div>
          {/* Header Logo */}
          <div className="flex items-center gap-2 mb-8">
            <img src="/images_icons/logo-no-text.png" alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-bold text-primary-blue">MySchoolDesk</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            <NavLink to={`/${user_type}/accueil`} className={location === 'accueil' ? "menu_active" : "menu_not_active"}>
              <FaHome className={location === 'accueil' ? "text-xl" : "text-xl text-primary-blue"} />
              Accueil
            </NavLink>
            <NavLink to={`/${user_type}/notes`} className={location === 'notes' ? "menu_active" : "menu_not_active"}>
              <FaBook className={location === 'notes' ? "text-xl" : "text-xl text-primary-blue"} />
              Notes
            </NavLink>
            <NavLink to={`/${user_type}/devoirs`} className={location === 'devoirs' ? "menu_active" : "menu_not_active"}>
              <FaClipboardList className={location === 'devoirs' ? "text-xl" : "text-xl text-primary-blue"} />
              Devoirs
            </NavLink>
            <NavLink to={`/${user_type}/quiz`} className={location === 'quiz' ? "menu_active" : "menu_not_active"}>
              <FaQuestionCircle className={location === 'quiz' ? "text-xl" : "text-xl text-primary-blue"} />
              Quiz
            </NavLink>
          </nav>

          {/* Support box */}
          <div className="bg-primary-blue text-white rounded-xl p-4 mt-8">
            <h3 className="font-bold text-sm">Support Administration</h3>
            <p className="text-xs mt-1">Lun - Ven de 9h à 17h</p>
            <button className="mt-3 text-primary-blue bg-white px-2 py-1 text-xs rounded-md">Contact</button>
            <img src="/images_icons/support-img.png" alt="Support" className="w-1/2 mt-3" />
          </div>
        </div>

        {/* Déconnexion */}
        <p onClick={() => mutation.mutate()} className="hover:cursor-pointer flex items-center gap-3 p-2 mt-6 text-gray-700 font-medium hover:bg-red-100 rounded-md">
          <FaSignOutAlt className="text-xl text-red-500" />
          Déconnexion
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-5 md:mr-5">
        <Outlet /> 
      </main>

      {/** right panel */}
      <div className="hidden md:flex md:flex-col md:sticky w-70  top-0 h-screen bg-white p-4 rounded-lg shadow text-s font-sans ml-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-blue text-white font-bold text-lg rounded-md w-10 h-10 flex items-center justify-center">
            {user.last_name[0]}
          </div>
          <span className="text-gray-700 font-medium">{user.last_name.toUpperCase()} {user.first_name}</span>
        </div>

        {should_fetch_user_type == "student" ?
            <div className="mb-6 flex flex-col gap-10">
        
              

              <div className="space-y-4">
                <div className="flex justify-between items-center text-primary-blue font-semibold mb-2">
                  <span>Devoir à faire</span>
                  <NavLink to={`/${user_type}/devoirs`} className="text-xs text-blue-500 hover:underline">Voir plus</NavLink>
                </div>
                {!isLoading  && last_homeworks.map((homework:any, index:number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary-blue h-10 flex items-center text-white text-xs font-semibold px-2 py-1  rounded-(--my-radius)">
                      {homework.due_date}
                    </div>
                    <div>
                      <div className="text-gray-800">{homework.description}</div>
                      <div className="text-gray-400 text-xs">{homework.subject}</div>
                    </div>
                  </div>
                ))}
              </div>

              

              <div className="space-y-4">

                <div>
                  <div className="flex justify-between items-center text-primary-blue font-semibold mb-2">
                    <span>Dernières notes ajoutées</span>
                    <NavLink to={`/${user_type}/notes`} className="text-xs text-blue-500 hover:underline">Voir plus</NavLink>
                  </div>
                </div>

                {!isPending && last_results.map((result:any, index:number) => (
                  <div key={index} className="flex gap-3 ">
                    <div className={` bg-primary-blue h-10 flex items-center text-white text-xs font-semibold px-2 py-1 rounded-(--my-radius)`}>
                      {result.score}/{result.result_on}
                    </div>
                    <div>
                      <div className="text-gray-800">{result.result_title}</div>
                      <div className="text-gray-400 text-xs">{result.subject}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            :
            <div>
              <div className="flex justify-between items-center text-primary-blue font-semibold mb-5">
                <span>Derniers devoirs ajoutés</span>
                <NavLink to={`/${user_type}/devoirs`} className="text-xs text-blue-500 hover:underline">Voir plus</NavLink>
              </div>

              <div className="space-y-4">
                {!isFetching && should_fetch_user_type == 'teacher' && last_homeworks_created.map((homework:any, index:number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary-blue h-10 flex items-center text-white text-xs font-semibold px-2 py-1  rounded-(--my-radius)">
                      {homework.homework_due_date}
                    </div>
                    <div>
                      <div className="text-gray-800">{homework.homework_description}</div>
                      <div className="text-gray-400 text-xs">Pour : {homework.classe_name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        }   
      </div>
    </div>
  );
}
