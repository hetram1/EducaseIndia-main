import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name || 'Guest User';
  const email = user?.email || 'Not logged in';
  const company = user?.company || '';
  const agency = user?.agency || '';
  const phone = user?.phone || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F8F9] to-[#e9e6fa] px-2">
      <div className="w-full max-w-md md:max-w-lg mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10 md:px-12 md:py-12 transition-all duration-300">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1D2226] mb-6 text-center">
            Account <span className="text-[#6C25FF]">Settings</span>
          </h2>
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="rounded-full w-20 h-20 object-cover border-4 border-[#E9DFFC] shadow"
              />
              <span className="absolute bottom-0 right-0 bg-[#6C25FF] p-1.5 rounded-full border-2 border-white shadow">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 13V7l6-4 6 4v6l-6 4-6-4z" />
                </svg>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg mb-1">{name}</span>
              <span className="text-gray-500 text-sm">{email}</span>
              {company && (
                <span className="text-gray-400 text-xs mt-0.5">{company}</span>
              )}
              {phone && (
                <span className="text-gray-400 text-xs mt-0.5">{phone}</span>
              )}
              {agency && (
                <span className="text-gray-400 text-xs mt-0.5">Agency: {agency}</span>
              )}
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              Welcome to your profile! Here you can view your account details and manage your settings.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#6C25FF] rounded-lg text-white text-base font-semibold px-6 py-2 shadow-md hover:bg-[#5A1EDB] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C25FF]"
              onClick={() => {
                localStorage.removeItem('user');
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;