import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");


export const checkToken = async () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const response = await axios.get(`${API_URL}/auth/check_token/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export const logout = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await axios.post(`${API_URL}/logout/`, { refresh: refreshToken });
    } catch (error) {
      console.error("Logout API error:", error);
    }
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.reload(); 
};
