import Login from './pages/auth/login'
import Digi_code_verif from './pages/auth/digi_code_verif';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Password_forget from './pages/auth/password_forget';
import { useQuery} from "@tanstack/react-query";
import Protected_route from './protected_route';
import Student_home from './pages/home/student_home';
import App_layout from './App_layout';

type User_interface = {
  first_name: string,
  last_name: string,
  email: string,
  is_student?: Boolean | any,
  is_teacher?:  Boolean | any, 
  is_staff?:  Boolean | any,
};

function App() {
  //get data of user in cache 
  const { data: user } = useQuery<User_interface>({queryKey:["user"]});

  return (
    <div className='flex'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/auth/digital_code' element={<Digi_code_verif />}/> 
          <Route path='/auth/reinitialiser_mdp' element={<Password_forget />}/> 

          <Route element={<App_layout />}>
            <Route path="student/accueil" element={<Student_home />} />
          </Route>

          {/* <Route element={<Protected_route condition={user?.is_student} redirectTo="/" />}>
          </Route> */}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
