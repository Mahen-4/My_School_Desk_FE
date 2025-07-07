import Left_quote_image from "../../components/auth_components/left_quote_image";
import {NavLink } from 'react-router-dom'

export default function Password_forget() {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Left_quote_image />

      {/* Right - digital code form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Réinitialiser mot de passe</h2>
          <p className="mb-8 text-sm text-gray-500">Entrer votre email</p>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
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
