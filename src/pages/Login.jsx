import React, { useState } from "react";
import { useNavigate } from "react-router";

const Input = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  showError,
}) => (
  <div className="relative w-full">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete={id}
      aria-invalid={showError}
      aria-describedby={showError ? `${id}-error` : undefined}
      className={`peer w-full px-4 pt-7 pb-2 text-base text-[#1D2226] border transition-all duration-200 rounded-lg appearance-none focus:outline-none focus:ring-2
        ${
          showError
            ? "border-red-500 focus:ring-red-400"
            : "border-[#CBCBCB] focus:ring-[#6C25FF]"
        }
        bg-white
        `}
    />
    <label
      htmlFor={id}
      className={`absolute left-3 top-2 px-1 text-[15px] bg-white pointer-events-none transition-all duration-200
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888]
        peer-focus:top-2 peer-focus:text-[15px] peer-focus:text-[#6C25FF]
        ${showError ? "text-red-500" : "text-[#6C25FF]"}
      `}
    >
      {placeholder}
      <span className="ml-0.5 text-red-500">*</span>
    </label>
    {showError && (
      <span id={`${id}-error`} className="text-xs text-red-500 absolute left-1 top-full mt-1">
        This field is required
      </span>
    )}
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  const isFormValid = formData.email.trim() && formData.password.trim();
  if (!isFormValid) return;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate("/profile");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  } catch (err) {
    alert('Login failed. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F8F9] to-[#e9e6fa] font-sans px-2">
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-xl border border-gray-100 px-6 py-10 md:px-10 md:py-12 transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D2226] leading-tight mb-2">
          Sign in to your <br className="hidden md:block" /> <span className="text-[#6C25FF]">PopX</span> account
        </h1>
        <p className="text-gray-500 text-base mb-8 mt-2">
          Welcome back! Please enter your credentials to continue.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            showError={isSubmitted && !formData.email.trim()}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            showError={isSubmitted && !formData.password.trim()}
          />

          <button
            type="submit"
            className="bg-[#6C25FF] rounded-lg text-white text-lg font-semibold w-full h-12 mt-8 shadow-md hover:bg-[#5A1EDB] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C25FF]"
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#6C25FF] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;