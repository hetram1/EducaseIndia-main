import React, { useState } from "react";
import { useNavigate } from "react-router";

// Animated floating label input
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

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, agency: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  const isFormValid =
    formData.email.trim() &&
    formData.password.trim() &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.company.trim();
  if (!isFormValid) return;

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      navigate("/login");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  } catch (err) {
    alert('Signup failed. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F8F9] to-[#e9e6fa] font-sans px-2">
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-xl border border-gray-100 px-6 py-10 md:px-10 md:py-12 transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D2226] leading-tight mb-2">
          Create your <br className="hidden md:block" /> <span className="text-[#6C25FF]">PopX</span> account
        </h1>
        <p className="text-gray-500 text-base mb-8 mt-2">Sign up to get started!</p>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <Input
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            showError={isSubmitted && !formData.name.trim()}
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            showError={isSubmitted && !formData.phone.trim()}
          />
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
          <Input
            id="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            showError={isSubmitted && !formData.company.trim()}
          />

          {/* Radio Group */}
          <div>
            <span className="text-[15px] font-medium text-[#1D2226]">
              Are you an Agency?<span className="text-red-500 ml-1">*</span>
            </span>
            <div className="flex gap-8 mt-3">
              <label className="flex items-center gap-2 text-base cursor-pointer">
                <input
                  type="radio"
                  name="agency"
                  value="Yes"
                  checked={formData.agency === "Yes"}
                  onChange={handleRadioChange}
                  className="accent-[#6C25FF] size-5 transition-all duration-200"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-base cursor-pointer">
                <input
                  type="radio"
                  name="agency"
                  value="No"
                  checked={formData.agency === "No"}
                  onChange={handleRadioChange}
                  className="accent-[#6C25FF] size-5 transition-all duration-200"
                />
                No
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#6C25FF] rounded-lg text-white text-lg font-semibold w-full h-12 mt-8 shadow-md hover:bg-[#5A1EDB] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C25FF]"
          >
            Create Account
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <span
            className="text-[#6C25FF] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;