import Left_quote_image from "../../components/auth_components/left_quote_image";
import {NavLink, useNavigate } from 'react-router-dom'
import { getCSRFToken, digi_code_check} from "../../api/auth_api";
import {useEffect, useRef, type RefObject}  from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';

export default function Digi_code_verif() {

  const navigate = useNavigate();

  const code_input_ref = useRef<HTMLInputElement | null>(null) 

  useEffect(() => {
      // check if credentials were good and can continue the process
      if (!sessionStorage.getItem("pending2FA")) {
        navigate("/"); //return to login
      }
    }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: digi_code_check, //make request
    onSuccess: (data : any) => {
        queryClient.setQueryData(["user"], data); // data to cache
        data.is_teacher == true ? navigate('/teacher/accueil') :  navigate('/student/accueil') // redirect 
       
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
          console.log(err)
      }
     
    }
  })


  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left_quote_image />
      <Toaster position="top-right"/>

      {/* Right - digital code form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="max-w-md w-full" onSubmit={(event: React.FormEvent)=> {
            event.preventDefault()
            mutation.mutate({digi_code: Number(code_input_ref.current?.value) })
          }}>
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Vérification de votre identité</h2>
          <p className="mb-8 text-sm text-gray-500">Nous venons de vous envoyer un code à 6 chiffres par email.<br/>Le code expire dans 5 minutes</p>

          <label htmlFor="digi_code" className="block text-sm font-medium text-gray-700 mb-1">
            Code à 6 chiffres *
          </label>
          <input
            ref={code_input_ref}
            type="number"
            id="digi_code"
            placeholder="Entrer le code"
            required
            className="form_input"
          />

          <button type="submit" className="form_submit">Valider</button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ou
            <NavLink to="/" className="block text-primary-blue font-semibold hover:underline">Retour à la page de connexion</NavLink>
            {mutation.isPending && <span className="block text-primary-blue font-semibold hover:underline">Chargement...</span> }
          </p>
          
        </form>
      </div>
    </div>
  );
}
