import React, { useRef,useState, useEffect } from "react";
import {
  FiEdit2,
  FiLogOut,
  FiSettings,
  FiStar,
  FiCalendar,
  FiGift,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const fileInputRef = useRef(null);
  const [showChangeInfoModal, setChangeInfoModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [username, setUsername] = useState(user?.username);
  const [success, setSuccess] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState(user?.profile_picture);

  const fetchUserProfile = async (
    setUser,
    setUsername,
    setPhoneNumber,
    setError,
    setLoading
  ) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Chưa đăng nhập");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/user_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      console.log("user: ", response.data);
      setUsername(response.data.username);
      setPhoneNumber(response.data.phone_number);
      setProfileImagePath(response.data.profile_picture);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(
      setUser,
      setUsername,
      setPhoneNumber,
      setError,
      setLoading
    );
  }, []);

  const handleChangeInfo = () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    axios
      .put(
        `${API_URL}/api/auth/update_profile/`,
        {
          phone_number: phoneNumber,
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setChangeInfoModal(false);
          });
          fetchUserProfile(
            setUser,
            setUsername,
            setPhoneNumber,
            setError,
            setLoading
          );
        } else {
          alert("Cập nhật thất bại! Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin: ", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại!");
      });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.patch(
        `${API_URL}/api/auth/update_profile_picture/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        const newProfilePath = response.data.profile_picture;
        setUser((prevUser) => ({
          ...prevUser,
          profile_picture: newProfilePath,
        }));
        setProfileImagePath(newProfilePath); 
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error);
    } finally {
      setLoading(false);
    }
  };

  const bookingHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:00",
      service: "Gel Manicure",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-20",
      time: "15:30",
      service: "Pedicure Deluxe",
      status: "upcoming",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-25",
      time: "13:00",
      service: "Full Set Acrylic",
    },
  ];

  const favoriteDesigns = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      title: "French Tips",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1610992015393-78ac03c85b34",
      title: "Glitter Ombre",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Profile Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <img
              src={`${API_URL}${profileImagePath}`}
              alt="Profile"
              className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#B76E79] transition-transform group-hover:scale-105 group-hover:shadow-lg"
            />
            <button
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              <FiEdit2 className="text-[#B76E79]" />
            </button>

            {/* Input file ẩn */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-[#36454F]">
              {user?.username}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phone_number}</p>
          </div>
        </div>
        <button
          onClick={() => setChangeInfoModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiEdit2 />
          Sửa thông tin
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Upcoming Appointments */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#36454F] mb-4 flex items-center gap-2">
              <FiCalendar className="text-[#B76E79]" />
              Upcoming Appointments
            </h2>
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-[#FFD1DC] bg-opacity-20 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{appointment.service}</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-[#B76E79] text-white rounded-md hover:opacity-90">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:opacity-90">
                      Cancel
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
            ))}
          </section>

          {/* Loyalty Program */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#36454F] mb-4 flex items-center gap-2">
              <FiGift className="text-[#B76E79]" />
              Loyalty Program
            </h2>
            <div className="text-center mb-4">
              <span className="inline-block bg-[#B76E79] text-white px-4 py-2 rounded-full font-medium">
                Gold Member
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to Platinum</span>
                <span>750/1000 points</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#B76E79] rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Booking History */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#36454F] mb-4">
              Booking History
            </h2>
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#B76E79] transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{booking.service}</h3>
                      <p className="text-gray-600 text-sm">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Favorite Designs */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#36454F] mb-4 flex items-center gap-2">
              <FiStar className="text-[#B76E79]" />
              Favorite Designs
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {favoriteDesigns.map((design) => (
                <div key={design.id} className="relative group">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiStar className="text-[#B76E79]" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Logout Modal */}
      {showChangeInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Thay đổi thông tin</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Tên người dùng
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setChangeInfoModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleChangeInfo}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thay đổi
              </button>
            </div>

            {/* Hiển thị thông báo cập nhật thành công */}
            {success && (
              <p className="text-green-600 text-sm mt-3 text-center">
                Cập nhật thành công!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
