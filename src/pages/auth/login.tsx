import { NavLink } from "react-router-dom";
import Left_quote_image from "../../components/auth_components/left_quote_image";
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth_api';
import React, { useRef, type RefObject, useEffect } from 'react';
import { getCSRFToken } from "../../api/auth_api";

export default function Login() {

  useEffect(() => {
      getCSRFToken();  // get csrf token
    }, []);

  const input_email_ref = useRef<HTMLInputElement>(null);
  const input_password_ref = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
    },
  });

  const login_check =(event: React.FormEvent)=>{
    event.preventDefault();
    console.log("formulaire soumis");
    const email_val: string = input_email_ref.current?.value || "";
    const password_val: string = input_password_ref.current?.value || "";

    mutation.mutate({ email: email_val, password: password_val })
  }



  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left_quote_image />

      {/* Right - login form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="max-w-md w-full" action="" onSubmit={login_check}>
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Connexion</h2>
          <p className="mb-8 text-sm text-gray-500">Avec votre email et mot de passe</p>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            ref={input_email_ref}
            type="email"
            id="email"
            placeholder="Entrer l'email"
            required
            className="form_input"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            ref={input_password_ref}
            type="password"
            id="password"
            placeholder="Entrer le mot de passe"
            required
            className="form_input"
          />

          <button type="submit" className="form_submit">Connexion</button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ou
            <NavLink to="/auth/reinitialiser_mdp" className="block text-primary-blue font-semibold hover:underline">Mot de passe oublié ?</NavLink>
          </p>
          
        </form>
      </div>
    </div>
  );
}
