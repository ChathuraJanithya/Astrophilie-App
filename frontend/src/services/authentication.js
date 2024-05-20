import axios from "axios";

export const login = async (body) => {
  try {
    const response = await axios.post(
      `https://astrophilie-app.onrender.com/user/signin`,
      body
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

export const register = async (body) => {
  try {
    const response = await axios.post(
      `https://astrophilie-app.onrender.com/user/signup`,
      body
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
