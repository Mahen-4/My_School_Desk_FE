import Login from './pages/auth/login'
import Digi_code_verif from './pages/auth/digi_code_verif';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Password_forget from './pages/auth/password_forget';
import Protected_route from './protected_route';
import Student_home from './pages/home/student_home';
import App_layout from './App_layout';
import Teacher_home from './pages/home/teacher_home';
import Password_change from './pages/auth/password_change';
import { use_current_user } from './api/auth_api';
import Teacher_homeworks from './pages/homeworks/teacher_homeworks';
import Teacher_add_homeworks from './pages/homeworks/teacher_add_homeworks';
import Teacher_edit_homeworks from './pages/homeworks/teacher_edit_homeworks';
import Students_homeworks from './pages/homeworks/student_homeworks';
import Teacher_add_results from './pages/results/teacher_add_results';
import Teacher_results from './pages/results/teacher_results';

// type User_interface = {
//   first_name: string,
//   last_name: string,
//   email: string,
//   is_student?: Boolean | any,
//   is_teacher?:  Boolean | any, 
//   is_staff?:  Boolean | any,
// };

function App() {
  
  //get data of current user 
  const { data: user, isLoading, isError } = use_current_user();

  // redirect to specific page if connected
  if( !isLoading){
    user?.is_student && <Navigate to='/student/accueil' replace />
    user?.is_teacher && <Navigate to='/teacher/accueil' replace /> 
  }

  return (
    <div className='flex'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/auth/digital_code' element={<Digi_code_verif />}/> 
          <Route path='/auth/reinitialiser_mdp' element={<Password_forget />}/> 
          <Route path='/auth/change_mdp/:token' element={<Password_change />} />

          {!isLoading && 
          (
            <Route element={<App_layout />}>
              <Route element={<Protected_route condition={user?.is_student} redirectTo="/" />}>
                <Route path="student/accueil" element={<Student_home />} />
                <Route path='student/devoirs' element={<Students_homeworks />} />
              </Route>
              <Route element={<Protected_route condition={user?.is_teacher} redirectTo="/" />}>
                <Route path="teacher/accueil" element={<Teacher_home />} />
                <Route path="teacher/devoirs" element={<Teacher_homeworks />} />
                <Route path="teacher/devoirs/ajouter" element={<Teacher_add_homeworks />} />
                <Route path="teacher/devoirs/modifier" element={<Teacher_edit_homeworks />} />
                <Route path="teacher/notes" element={<Teacher_results />}/>
                <Route path="teacher/notes/ajouter" element={<Teacher_add_results />}/>
              </Route>
            </Route>
          )}


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
