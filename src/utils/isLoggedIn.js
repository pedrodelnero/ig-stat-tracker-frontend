import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
var eightHours = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

export const signUp = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: eightHours });
};

export const logOut = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isLoggedIn = () => {
  if (Cookies.get(TOKEN_KEY)) {
    return true;
  }

  return false;
};
