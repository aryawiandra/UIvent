export default function Login() {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-grain">
        {/* Main Content */}
        <div className="flex items-center justify-center flex-grow">
          <div className="bg-gradient-to-br from-dark via-gray-800 to-black border border-primary p-8 rounded-2xl shadow-2xl text-center max-w-2xl">
            <h2 className="text-3xl font-semibold text-primary mb-4">Login</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-primary focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="w-full p-3 rounded bg-primary text-dark font-semibold hover:opacity-90 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
              Belum punya akun?{" "}
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }