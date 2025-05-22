import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F8F9] to-[#e9e6fa] px-2">
      <div className="w-full max-w-md md:max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-12 md:px-12 md:py-16 flex flex-col items-center transition-all duration-300">
          {/* Logo or Icon */}
          <div className="mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6C25FF]/10">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-[#6C25FF]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D2226] mb-2 text-center">
            Welcome to <span className="text-[#6C25FF]">PopX</span>
          </h1>
          <p className="text-gray-500 text-center mb-8 text-base md:text-lg">
            Join PopX to unlock exclusive features and connect with our amazing community!
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Link to="/signup">
              <button className="w-full bg-[#6C25FF] text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#5A1EDB] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C25FF]">
                Create Account
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full bg-[#E9DFFC] text-[#6C25FF] py-3 rounded-lg font-semibold text-lg shadow hover:bg-[#f3f0fa] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C25FF]">
                Already Registered? Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;