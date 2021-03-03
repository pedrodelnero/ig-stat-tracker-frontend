import Cookies from 'js-cookie';

const TOKEN_KEY = 'userId';

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  console.log('cookie', Cookies.get(TOKEN_KEY));
  if (Cookies.get(TOKEN_KEY)) {
    return true;
  }

  return false;
};
