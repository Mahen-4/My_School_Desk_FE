export default function Login() {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Left - quote and blurred background */}
      <div className="hidden md:flex w-1/2 relative text-white flex-col justify-center px-60">
        {/* Background image blurred */}
        <div
          className="bg-primary-blue absolute inset-0 bg-[url('/images_icons/login_background.webp')] bg-blend-soft-light bg-cover"
          aria-hidden="true"
        />
        <blockquote className="relative max-w-md text-white">
          <p className="text-lg leading-relaxed mb-6">
            <span className="text-3xl leading-none mr-2">“</span>
            Those people who develop the ability to continuously acquire new and better forms of knowledge that they can apply to their work and to their lives will be the movers and shakers in our society for the indefinite future.
          </p>
          <footer className="text-sm font-light">Brian Tracy</footer>
        </blockquote>
      </div>

      {/* Right - login form */}
      <div className="w-full px-0 md:w-1/2 bg-gray-50 flex flex-col justify-center md:px-60 ">
        {/* Logo */}
        <div className="mb-12 flex items-center space-x-3">
          <img src="/images_icons/logo-no-text.png" alt="MySchoolDesk logo" className="w-10 h-10" />
          <span className="font-semibold text-primary-blue text-xl">MySchoolDesk</span>
        </div>

        {/* Form */}
        <form className="max-w-md w-full">
          <h2 className="text-2xl font-semibold text-primary-blue mb-2">Connexion</h2>
          <p className="mb-8 text-sm text-gray-500">Avec votre email et mot de passe</p>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrer l'email"
            required
            className="mb-6 w-full rounded-(--my-radius) border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrer le mot de passe"
            required
            className="mb-6 w-full rounded-(--my-radius) border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full bg-primary-blue text-white py-2 rounded-(--my-radius) hover:bg-primary-blue-hover transition-colors hover:cursor-pointer font-semibold"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ou
            <a href="#" className="block text-primary-blue font-semibold hover:underline">Mot de passe oublié ?</a>
          </p>
          
        </form>
      </div>
    </div>
  );
}
