"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 font-sans text-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
            TaskManager
          </span>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-6 py-2.5 rounded-full font-semibold text-gray-600 hover:text-blue-600 transition-all">
                Log In
              </Link>
              <Link href="/register" className="px-6 py-2.5 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-300">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase">
            Productivity Reimagined
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Manage tasks with <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              Flow & Focus
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            The minimal task manager that helps you organize your work, hit deadlines, and achieve your goals—without the bloat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">Start Managing Free</span>
            </Link>
          </div>
        </div>

        {/* Hero Illustration Placeholder (Glassmorphism card) */}
        <div className="md:w-1/2 mt-16 md:mt-0 relative flex justify-center">
          <div className="relative w-full max-w-lg aspect-square bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl p-8 flex flex-col justify-between transform hover:rotate-2 transition-transform duration-500">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-2xl shadow-sm">
                <div className="w-6 h-6 rounded-md bg-blue-500 flex-shrink-0"></div>
                <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-2xl shadow-sm ml-8">
                <div className="w-6 h-6 rounded-md bg-indigo-500 flex-shrink-0"></div>
                <div className="h-2 w-48 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-2xl shadow-sm">
                <div className="w-6 h-6 rounded-md bg-purple-500 flex-shrink-0"></div>
                <div className="h-2 w-40 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl">
              <div className="text-sm opacity-80 mb-1">Your Space</div>
              <div className="text-2xl font-bold">Manage your tasks with ease</div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-[-20px] right-[-20px] bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold">Task Done!</div>
                <div className="text-[10px] text-gray-400">2 mins ago</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 text-gray-400 text-sm mt-20 border-t border-gray-100">
        © 2024 TaskManager. Simple. Focused. Productive.
      </footer>
    </div>
  );
}
