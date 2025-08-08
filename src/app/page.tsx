import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-600 mb-4">
        BetterTodos
      </h1>

      <p className="text-gray-600 text-lg md:text-xl mb-10 text-center max-w-xl">
        Organize. Track. Get things done — better and faster.
      </p>

      <div className="flex flex-col gap-8 w-9/12 sm:w-6/12 text-xl">
        <Link
          href="/boards"
          className="w-full px-6 py-4 bg-[#07ff88] text-white rounded-lg shadow-md hover:bg-green-600 transition text-center font-black tracking-widest"
        >
          Enter
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/login"
            className="w-full px-6 py-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition text-center"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="w-full px-6 py-4 bg-white border border-indigo-500 text-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition text-center"
          >
            Register
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} BetterTodos. All rights reserved.
      </footer>
    </main>
  );
}
