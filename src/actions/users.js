import axios from 'axios';
import Cookies from 'js-cookie';

import { logOut, signUp } from '../utils/isLoggedIn';

const token = Cookies.get('token');

const userAPI = axios.create({
  baseURL: 'https://delnero-ig-stat.herokuapp.com',
  // baseURL: 'http://localhost:5000/',
  headers: { Authorization: `Bearer ${token}` },
});

export const createUser = async (username, password, confirmPassword) => {
  try {
    const {
      data: { message, token },
    } = await userAPI.post('/sign-up', { username, password, confirmPassword });

    signUp(token);

    return { success: true, message };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};

export const logInUser = async (username, password) => {
  try {
    const {
      data: { message, token },
    } = await userAPI.post('/login', { username, password });

    signUp(token);

    return { success: true, message };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};

export const logOutUser = async () => {
  try {
    const {
      data: { message },
    } = await userAPI.post('/logout', {});

    logOut();

    return { success: true, message };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};
