import React, { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiPhone,
  FiX,
  FiCalendar,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { SiZalo, SiTiktok, SiInstagram } from "react-icons/si";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [nailDesigns, setNailDesigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedNail, setSelectedNail] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    nail_sample: null,
    booking_date: "",
    booking_time: "",
    notes: "",
  });
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchNailDesigns = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/nails/?page=${currentPage}&page_size=${itemsPerPage}${
            searchQuery ? `&search=${searchQuery}` : ""
          }`
        );
        console.log("API Response:", response.data);
        setNailDesigns(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.error("Error fetching nail designs:", error);
      }
    };
    fetchNailDesigns();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
  };

  const openBookingModal = (design) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để đặt lịch"); // Hiển thị thông báo
      navigate("/login", {
        state: {
          from: window.location.pathname,
          message: "Vui lòng đăng nhập để đặt lịch",
        },
      });
      return;
    }
    setSelectedNail(design);
    setBookingData((prev) => ({
      ...prev,
      nail_sample: design.id,
    }));
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedNail(null);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${API_URL}/api/bookings/`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking submitted:", response.data);
      setBookingData({
        nail_sample: null,
        booking_date: "",
        booking_time: "",
        notes: "",
      });
      setShowBookingModal(false);
      alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.");
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="from-pink-50 to-purple-50 min-h-screen">
      {/* Fixed Social Media Icons */}
      <div className="fixed right-6 bottom-20 flex flex-col gap-4 z-40">
        <a
          href="https://www.facebook.com/dxhieu185"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-pink-200 group animate-pulse hover:animate-none"
        >
          <FaFacebook className="text-blue-600 text-2xl transform transition-transform duration-300 group-hover:scale-110" />
        </a>
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-lavender-200 group animate-pulse hover:animate-none"
        >
          <SiZalo className="text-blue-500 text-2xl transform transition-transform duration-300 group-hover:scale-110" />
        </a>
        <a
          href="https://www.tiktok.com/@doxuanhieeur"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-lavender-200 group animate-pulse hover:animate-none"
        >
          <SiTiktok className="text-blue-500 text-2xl transform transition-transform duration-300 group-hover:scale-110" />
        </a>
        <a
          href="https://www.instagram.com/doxuanhieeur/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-lavender-200 group animate-pulse hover:animate-none"
        >
          <SiInstagram className="text-blue-500 text-2xl transform transition-transform duration-300 group-hover:scale-110" />
        </a>
        <a
          href="tel:+900"
          className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-pink-300 group animate-pulse hover:animate-none"
        >
          <FiPhone className="text-mauve-700 text-2xl transform transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 animate-fade-in-up">
            <div className="relative">
              {/* Header with gradients */}
              <div className="bg-gradient-to-r from-pink-200 to-lavender-200 rounded-t-2xl p-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-mauve-700 font-montserrat">
                  Đặt Lịch
                </h3>
                <button
                  onClick={closeBookingModal}
                  className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition-all duration-300"
                >
                  <FiX className="text-mauve-700" />
                </button>
              </div>

              {/* Selected design preview */}
              {selectedNail && (
                <div className="p-4 border-b border-pink-100 flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={
                        selectedNail.image ||
                        "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
                      }
                      alt={selectedNail.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {selectedNail.title}
                    </h4>
                    <p className="text-sm text-pink-500 font-medium">
                      ${selectedNail.price}
                    </p>
                  </div>
                </div>
              )}

              {/* Booking form */}
              <form onSubmit={handleBookingSubmit} className="p-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiCalendar className="mr-2 text-pink-400" />
                      Ngày đặt lịch
                    </label>
                    <input
                      type="date"
                      name="booking_date"
                      min={today}
                      value={bookingData.booking_date}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border-2 border-pink-100 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiClock className="mr-2 text-pink-400" />
                      Giờ đặt lịch
                    </label>
                    <input
                      type="time"
                      name="booking_time"
                      value={bookingData.booking_time}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border-2 border-pink-100 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FiMessageSquare className="mr-2 text-pink-400" />
                      Ghi chú
                    </label>
                    <textarea
                      name="notes"
                      value={bookingData.notes}
                      onChange={handleBookingChange}
                      placeholder="Ví dụ: Tôi muốn vẽ hoa trên móng..."
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border-2 border-pink-100 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-pink-300 to-lavender-300 text-mauve-700 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-pink-400 hover:to-lavender-400 transform hover:scale-[1.02]"
                  >
                    Xác Nhận Đặt Lịch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <main className="w-full mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search nail designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-full border-2 border-pink-200 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 shadow-md transition-all duration-300 font-poppins"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-pink-200 to-lavender-200 rounded-full flex items-center justify-center transition-all duration-300 hover:from-pink-300 hover:to-lavender-300"
            >
              <FiSearch className="text-mauve-600 text-xl" />
            </button>
          </form>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-8 text-mauve-600 font-montserrat">
          Huahua-nails
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {nailDesigns.map((design) => (
            <div
              key={design.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <div className="relative pb-[60%]">
                <img
                  src={
                    design.image ||
                    "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
                  }
                  alt={design.title}
                  className="absolute inset-0 w-full h-[200px] object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 font-montserrat">
                  {design.title}
                </h3>
                <p className="text-gray-600 mb-4 font-poppins">
                  {design.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gold-600">
                    {design.price}đ
                  </span>
                  <button
                    onClick={() => openBookingModal(design)}
                    className="px-6 py-2 bg-pink-200 text-mauve-700 rounded-full font-semibold transition-all duration-300 hover:bg-pink-300 hover:shadow-md transform hover:scale-105"
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-lavender-200 text-mauve-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-lavender-300"
          >
            <FiChevronLeft size={24} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-pink-200 text-mauve-700"
                  : "bg-lavender-100 text-mauve-500 hover:bg-pink-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-lavender-200 text-mauve-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-lavender-300"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
