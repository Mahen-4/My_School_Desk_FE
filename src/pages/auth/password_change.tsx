import { NavLink, useNavigate } from "react-router-dom";
import Left_quote_image from "../../components/auth_components/left_quote_image";
import {useEffect, useRef, type RefObject}  from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCSRFToken, change_password} from "../../api/auth_api";
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

export default function Password_change() {
  
  const navigate = useNavigate();
  const params= useParams() //get url param

  const input_password_ref = useRef<HTMLInputElement>(null);
  const input_password_confirm_ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
      // check if credentials were good and can continue the process
      if (!sessionStorage.getItem("pending_reset_mdp")) {
        navigate("/"); //return to login
      }
    }, []);

  const mutation = useMutation({
    mutationFn: change_password, // execute request 
    onSuccess: () => {
      toast.success('Mot de passe modifié !', {style: {
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
  
  const check_passwords = (event: React.FormEvent)=>{
    event.preventDefault();

   //check value if not empty or null
    const password_val: string = input_password_ref.current?.value || ""; 
    const password_confirm_val: string = input_password_confirm_ref.current?.value || "";
    const token :string = params.token || "" 

    if (token == "" || password_val == "" || password_val == null || password_confirm_val == "" || password_confirm_val == null){
      toast.error("Champs vide ou pas de token !", {style: {
        padding: '16px',
        fontSize: '20px'
      },})
    }
    else if (password_val != password_confirm_val){
      toast.error("Les mots de passe ne sont pas identique !", {style: {
        padding: '16px',
        fontSize: '20px'
      },})
    }
    else{
      //execute function login with those credentials
      mutation.mutate({ token: token , password: password_val })
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left_quote_image />
      <Toaster />
      {/* Right - login form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="max-w-md w-full" onSubmit={check_passwords}>
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Modifier mot de passe</h2>
          <p className="mb-8 text-sm text-gray-500">Entrer votre nouveau mot de passe</p>

          <label htmlFor="new_mdp" className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe *
          </label>
          <input
            ref={input_password_ref}
            type="password"
            id="new_mdp"
            placeholder="Entrer nouveau mot de passe"
            required
            className="form_input"
          />

          <label htmlFor="new_mdp_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            ref={input_password_confirm_ref}
            type="password"
            id="new_mdp_confirmation"
            placeholder="Confirmer nouveau mot de passe"
            required
            className="form_input"
          />

          <button type="submit" className="form_submit">Changer mot de passe</button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ou
            <NavLink to="/" className="block text-primary-blue font-semibold hover:underline">Retour à la page de connexion</NavLink>
          </p>
          
        </form>
      </div>
    </div>
  );
}
