import Left_quote_image from "../../components/auth_components/left_quote_image";
import {NavLink, useNavigate } from 'react-router-dom'
import {useEffect, useRef, type RefObject}  from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCSRFToken, reset_password} from "../../api/auth_api";
import toast, { Toaster } from 'react-hot-toast';

export default function Password_forget() {

  const navigate = useNavigate();
  
  const email_input_ref = useRef<HTMLInputElement>(null) 


  const mutation = useMutation({
    mutationFn: reset_password, // execute request
    onSuccess: () => {
       sessionStorage.setItem("pending_reset_mdp", "true"); // set session variable for change page protect
       toast.success('Email envoyé', {style: {
          padding: '16px',
          fontSize: '20px'
        },})
       navigate('/')
    },
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
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left_quote_image />
      <Toaster/>
      {/* Right - digital code form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center flex justify-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="md:max-w-md w-screen p-4" onSubmit={(event: React.FormEvent)=> {
            event.preventDefault()
            mutation.mutate({email: email_input_ref.current?.value || "" })
          }}>
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Réinitialiser mot de passe</h2>
          <p className="mb-8 text-sm text-gray-500">Entrer votre email</p>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            ref={email_input_ref}
            type="email"
            id="email"
            placeholder="Entrer l'email"
            required
            className="form_input"
          />

          <button type="submit" className="form_submit">Réinitialiser</button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ou
            <NavLink to="/" className="block text-primary-blue font-semibold hover:underline">Retour à la page de connexion</NavLink>
          </p>
          
        </form>
      </div>
    </div>
  );
}
