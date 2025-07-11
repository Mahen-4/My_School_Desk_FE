// src/components/Layout.tsx
import { useMutation } from '@tanstack/react-query';
import { FaHome, FaBook, FaClipboardList, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { logout } from './api/auth_api';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function App_layout() {


  let user_type = useLocation().pathname.split('/')[1] //get student or teacher
  let location = useLocation().pathname.split('/')[2] // get current location

  const navigate = useNavigate()

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

  return (
    <div className="flex min-h-screen">
      <Toaster position='top-right' />
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between px-4 py-6 fixed h-screen">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <img src="/images_icons/logo-no-text.png" alt="Logo" className="w-15 h-15" />
            <h1 className="text-xl font-bold text-primary-blue">MySchoolDesk</h1>
          </div>

          <nav className="flex flex-col gap-4">
            <NavLink to={`/${user_type}/accueil`} className={location == 'accueil' ? "menu_active" : "menu_not_active"}>
              <FaHome className={location == 'accueil' ?  "text-xl" : "text-xl text-primary-blue" } />
              Accueil
            </NavLink>
            <NavLink to={`/${user_type}/notes`} className={location == 'notes' ? "menu_active" : "menu_not_active"}>
              <FaBook className={location == 'notes' ?  "text-xl" : "text-xl text-primary-blue" } />
              Notes
            </NavLink>
            <NavLink to={`/${user_type}/devoirs`} className={location == 'devoirs' ? "menu_active" : "menu_not_active"}>
              <FaClipboardList className={location == 'devoirs' ?  "text-xl" : "text-xl text-primary-blue" } />
              Devoirs
            </NavLink>
            <NavLink to={`/${user_type}/quiz`} className={location == 'quiz' ? "menu_active" : "menu_not_active"}>
              <FaQuestionCircle className={location == 'quiz' ?  "text-xl" : "text-xl text-primary-blue" } />
              Quiz
            </NavLink>
          </nav>

          <div className="bg-primary-blue text-white rounded-xl p-4 mt-50">
            <h3 className="font-bold text-sm">Support Administration</h3>
            <p className="text-xs mt-1">Lun - Ven de 9h à 17h</p>
            <button className="mt-3 text-primary-blue bg-white px-2 py-1 text-xs rounded-md">Contact</button>
            <img src="/images_icons/support-img.png" alt="Support" className="w-1/2 mt-3" />
          </div>
        </div>

        <p onClick={()=> mutation.mutate()} className="hover:cursor-pointer flex items-center gap-3 p-2 mt-6 text-gray-700 font-medium hover:bg-red-100 rounded-md">
          <FaSignOutAlt className="text-xl text-red-500" />
          Déconnexion
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 ml-64">
        <Outlet /> {/* Affiche les routes enfants ici */}
      </main>

       <div className="w-64 fixed right-0 top-0 h-screen bg-white shadow-md flex flex-col justify-between px-4 py-6 z-10">
        Droite
      </div>
    </div>
  );
}
