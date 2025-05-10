// File: src/components/Header.jsx
export default function Header({ refs }) {
    return (
      <header className="fixed top-0 left-0 w-full bg-neutral-900/70 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-yellow-400 font-bold text-xl">UIvent</div>
        <nav className="flex gap-6 text-white text-sm font-medium">
          <button onClick={() => refs.aboutRef.current.scrollIntoView({ behavior: "smooth" })} className="hover:text-yellow-300 transition">
            About
          </button>
          <button onClick={() => refs.featuresRef.current.scrollIntoView({ behavior: "smooth" })} className="hover:text-yellow-300 transition">
            Features
          </button>
          <button onClick={() => refs.contactRef.current.scrollIntoView({ behavior: "smooth" })} className="hover:text-yellow-300 transition">
            Contact
          </button>
          <button className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 transition">
            Sign in
          </button>
        </nav>
      </header>
    );
  }
  