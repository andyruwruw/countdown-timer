import jsonwebtoken from 'jsonwebtoken';

const {
  SECRET,
} = process.env;

export const parseCookie = (req) => {
  const cookie = req.cookies['cday-token'];
  if (!cookie) {
    return null;
  }
  try {
    const decoded = jsonwebtoken.verify(cookie, SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const getCookie = (req) => {
  return req.cookies['cday-token'];
};

export const generateToken = (data, expires) => {
  return jsonwebtoken.sign(data, SECRET, {
    expiresIn: expires
  });
};

