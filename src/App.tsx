import Login from './pages/auth/login'
import Digi_code_verif from './pages/auth/digi_code_verif';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Password_forget from './pages/auth/password_forget';
import Protected_route from './protected_route';
import Student_home from './pages/home/student_home';
import App_layout from './App_layout';
import Teacher_home from './pages/home/teacher_home';
import Password_change from './pages/auth/password_change';
import { use_current_user, use_getCSRFToken } from './api/auth_api';
import Teacher_homeworks from './pages/homeworks/teacher_homeworks';
import Teacher_add_homeworks from './pages/homeworks/teacher_add_homeworks';
import Teacher_edit_homeworks from './pages/homeworks/teacher_edit_homeworks';
import Students_homeworks from './pages/homeworks/student_homeworks';
import Teacher_add_results from './pages/results/teacher_add_results';
import Teacher_results from './pages/results/teacher_results';
import Teacher_edit_results from './pages/results/teacher_edit_results';
import Student_results from './pages/results/student_results';
import Teacher_quiz from './pages/quiz/teacher_quiz';
import Teacher_add_quiz from './pages/quiz/teacher_add_quiz';
import Teacher_edit_quiz from './pages/quiz/teacher_edit_quiz';
import Student_quiz from './pages/quiz/student_quiz';
import Student_quiz_info from './pages/quiz/student_quiz_info';
import Student_quiz_play from './pages/quiz/student_quiz_play';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function App() {
  
  //get data of current user 
  const { data: user, isLoading, isError } = use_current_user();

  
  
  const HomePage = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Chargement...</div>
        </div>
      );
    }
    
    if (!user) {
      return <Login />;
    }
    
    if (user.is_student) {
      return <Navigate to="/student/accueil" replace />;
    }
    
    if (user.is_teacher) {
      return <Navigate to="/teacher/accueil" replace />;
    }
    
    // Fallback
    return <Login />;
  };
 


  const {data: csrfToken, isPending} = use_getCSRFToken()

  
  return (
    
    <div className=''>
      {!isPending && 
      (
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<HomePage />} />

          <Route path='/auth/digital_code' element={<Digi_code_verif />}/> 
          <Route path='/auth/reinitialiser_mdp' element={<Password_forget />}/> 
          <Route path='/auth/change_mdp/:token' element={<Password_change />} />

          {!isLoading &&
          (
            <Route element={!user ? <Navigate to="/" replace /> : <App_layout />}>
              <Route element={<Protected_route condition={user?.is_student} redirectTo="/" />}>
                <Route path="student/accueil" element={<Student_home />} />
                <Route path='student/devoirs' element={<Students_homeworks />} />
                <Route path='student/notes' element={<Student_results />} />
                <Route path='student/quiz' element={<Student_quiz />} />
                <Route path='student/quiz/info' element={<Student_quiz_info />} />
                <Route path='student/quiz/jouer' element={<Student_quiz_play />} />

              </Route>
              
              <Route element={<Protected_route condition={user?.is_teacher} redirectTo="/" />}>
                <Route path="teacher/accueil" element={<Teacher_home />} />
                <Route path="teacher/devoirs" element={<Teacher_homeworks />} />
                <Route path="teacher/devoirs/ajouter" element={<Teacher_add_homeworks />} />
                <Route path="teacher/devoirs/modifier" element={<Teacher_edit_homeworks />} />
                <Route path="teacher/notes" element={<Teacher_results />}/>
                <Route path="teacher/notes/ajouter" element={<Teacher_add_results />}/>
                <Route path="teacher/notes/modifier" element={<Teacher_edit_results />}/>
                <Route path="teacher/quiz" element={<Teacher_quiz />} />
                <Route path="teacher/quiz/ajouter" element={<Teacher_add_quiz />} />
                <Route path="teacher/quiz/modifier" element={<Teacher_edit_quiz />} />  
              </Route>
            </Route>
          )}
         
          
          {/* if url not existing redirect  */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
      )}
    </div>
  )
}

export default App
