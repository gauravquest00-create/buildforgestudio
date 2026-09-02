export const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const isValidUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
