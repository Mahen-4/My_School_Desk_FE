import { useState } from 'react'
import Login from './pages/auth/login'
import Digi_code_verif from './pages/auth/digi_code_verif';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Password_forget from './pages/auth/password_forget';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Digi_code_verif />} />
        <Route path='auth/connexion' element={<Login />}/> 
        <Route path='auth/reinitialiser_mdp' element={<Password_forget />}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
