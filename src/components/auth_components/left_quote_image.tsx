export default function Left_quote_image() {
  return (
    <>
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
    </>
  );
}
