import axios from "axios";

// const instance = axios.create({
//   url: "http://localhost:3001/users/login",
// });

export const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://192.168.1.5:3001/users/login",
      userData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    //console.log(response.data.token);
    return response;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const getUserDetails = async (token, userId) => {
  try {
    const response = await axios.get(
      `http://192.168.1.5:3001/users/details/${userId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch user details error:", error);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(
      "http://192.168.1.5:3001/users/register",
      userData,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Login error:", error);
  }
};
