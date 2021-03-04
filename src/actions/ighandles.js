import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const handleAPI = axios.create({
  //   baseURL: "https://delnero-review-site.herokuapp.com/user",
  baseURL: 'http://localhost:5000',
  headers: { Authorization: `Bearer ${token}` },
});

export const createHandle = async (handle) => {
  try {
    const {
      data: { message, id },
    } = await handleAPI.post('/handle', { handle });

    return { success: true, message, id };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};

export const getHandles = async () => {
  try {
    const { data } = await handleAPI.get('/handles', {});

    return { success: true, data };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};

export const deleteHandle = async (handleId) => {
  try {
    const { data } = await handleAPI.delete(`/handle/${handleId}`);

    return { success: true, message: data.message };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};

export const updateHandle = async (handleId, newHandle) => {
  try {
    const { data } = await handleAPI.patch(`/handle/${handleId}`, {
      newHandle,
    });

    return { success: true, message: data.message };
  } catch (err) {
    console.log(err.response.data);
    return { success: false, message: err.response.data };
  }
};
