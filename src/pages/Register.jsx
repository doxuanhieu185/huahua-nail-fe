import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Tên người dùng không được để trống";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Confirm password validation
    if (!formData.password_confirm) {
      newErrors.password_confirm = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "error") {
        setErrors({ ...errors, ...data.errors });
        setGeneralError(
          "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin."
        );
      } else if (response.ok) {
        navigate("/login");
      } else {
        setGeneralError("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setGeneralError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#6B556B]">
            Chào mừng bạn đến với Huahua-Nail
          </h1>
          <p className="text-[#6B556B]">Đăng ký tài khoản</p>
        </div>

        {generalError && (
          <div className="p-3 rounded-lg bg-red-50 text-red-400 text-sm text-center mb-6">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative flex items-center">
            <FiMail className="absolute left-3 h-5 w-5 text-[#8B7B8B]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full min-h-[60px] pl-10 pr-4 py-3 rounded-xl bg-pink-50/50 border ${
                errors.email ? "border-red-300" : "border-pink-100"
              } focus:outline-none focus:ring-2 focus:ring-pink-200 text-[#8B7B8B] placeholder-[#8B7B8B]/50`}
              placeholder="Email của bạn"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email}</p>
          )}

          {/* Username */}
          <div className="relative flex items-center">
            <FiUser className="absolute left-3 h-5 w-5 text-[#8B7B8B]" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full min-h-[60px] pl-10 pr-4 py-3 rounded-xl bg-pink-50/50 border ${
                errors.username ? "border-red-300" : "border-pink-100"
              } focus:outline-none focus:ring-2 focus:ring-pink-200 text-[#8B7B8B] placeholder-[#8B7B8B]/50`}
              placeholder="Tên người dùng"
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-400 mt-1">{errors.username}</p>
          )}

          {/* Password */}
          <div className="relative">
            <div className="absolute left-0 pl-3 flex items-center h-full">
              <FiLock className="h-5 w-5 text-[#6B556B]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full min-h-[60px] pl-10 pr-12 py-3 rounded-xl bg-pink-50/50 border ${
                errors.password ? "border-red-300" : "border-pink-100"
              } focus:outline-none focus:ring-2 focus:ring-pink-200 text-[#6B556B] placeholder-[#6B556B]/60`}
              placeholder="Mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-[#6B556B]" />
              ) : (
                <FiEye className="h-5 w-5 text-[#6B556B]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute left-0 pl-3 flex items-center h-full">
              <FiLock className="h-5 w-5 text-[#6B556B]" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              className={`w-full min-h-[60px] pl-10 pr-12 py-3 rounded-xl bg-pink-50/50 border ${
                errors.password_confirm ? "border-red-300" : "border-pink-100"
              } focus:outline-none focus:ring-2 focus:ring-pink-200 text-[#6B556B] placeholder-[#6B556B]/60`}
              placeholder="Xác nhận mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5 text-[#6B556B]" />
              ) : (
                <FiEye className="h-5 w-5 text-[#6B556B]" />
              )}
            </button>
          </div>
          {errors.password_confirm && (
            <p className="text-sm text-red-400 mt-1">
              {errors.password_confirm}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD1DC] to-[#E6E6FA] text-[#6B556B] font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-8 text-center text-[#6B556B]">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-400 hover:underline focus:outline-none"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
