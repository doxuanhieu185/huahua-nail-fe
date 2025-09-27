import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock 
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#FFF0F5] pt-10 pb-6 mt-10 border-t border-[#FFD1DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <img 
              src={require("../assets/huahua-nail.png")} 
              alt="Nail Salon Logo" 
              className="h-16 w-auto mb-4" 
            />
            <p className="text-[#4A4A4A] mb-4">
              Chúng tôi cung cấp các dịch vụ làm móng chất lượng cao với 
              sự tận tâm và chuyên nghiệp. Đến với chúng tôi để trải nghiệm 
              dịch vụ làm đẹp tốt nhất.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#4A4A4A] hover:text-[#FFB6C1]">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#4A4A4A] hover:text-[#FFB6C1]">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#4A4A4A] hover:text-[#FFB6C1]">
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-[#4A4A4A] font-semibold text-lg mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-[#FFB6C1] mt-1 mr-3" />
                <span className="text-[#4A4A4A]">24A 196 Cầu Giấy-Quan Hoa- Cầu Giấy-HN</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 text-[#FFB6C1] mr-3" />
                <span className="text-[#4A4A4A]">033 486 2379</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-[#FFB6C1] mr-3" />
                <span className="text-[#4A4A4A]">dohieu825@gmail.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="w-5 h-5 text-[#FFB6C1] mt-1 mr-3" />
                <div>
                  <p className="text-[#4A4A4A]">Thứ 2 - Thứ 6: 9:00 - 20:00</p>
                  <p className="text-[#4A4A4A]">Thứ 7 - Chủ nhật: 10:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#4A4A4A] font-semibold text-lg mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Dịch Vụ
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Đặt Lịch
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-[#4A4A4A] hover:text-[#FFB6C1] transition-colors duration-200">
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="mt-8 pt-6 border-t border-[#FFD1DC]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-[#4A4A4A] font-semibold text-lg mb-4 md:mb-0">Đăng Ký Nhận Thông Tin</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="px-4 py-2 border border-[#FFD1DC] rounded-l-full focus:outline-none focus:border-[#FFB6C1]"
              />
              <button className="bg-[#FFD1DC] text-white px-4 py-2 rounded-r-full hover:bg-[#FFB6C1] transition-colors duration-200">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#FFD1DC] text-center">
          <p className="text-[#4A4A4A]">
            &copy; {currentYear} Huahua Nail Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;