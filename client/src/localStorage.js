export const USER_KEY = '_voting_user';

export const loadUserStorage = () => {
  try {
    const user =  JSON.parse(localStorage.getItem(USER_KEY));
    return user;
  } catch (err) {
    return null;
  }
};

export const saveUserStorage = data => {
  let access_token = data ? data.access_token : null;
  let id_user = data ? data.id_user : null;
  access_token && id_user
    ? localStorage.setItem(USER_KEY, JSON.stringify({
      access_token : access_token,
      id_user : id_user
    }))
    : localStorage.removeItem(USER_KEY);
};
