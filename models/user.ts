import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  colors: {
    type: Number,
    default: 0,
  },
  calendars: [
    {
      type: String,
    }
  ],
  clockType: {
    type: String,
    default: 'pie',
  },
  textType: {
    type: String,
    default: 'verbouse',
  },
});

export const User = mongoose.model('User', schema);

export const defaultUserObject = (userID) => {
  return new User({
    username: userID,
    colors: 0,
    calendars: ['primary'],
    clockType: 'pie',
    textType: 'verbouse'
  });
};

export const userExists = async (userID) => {
  return await User.findOne({
    username: userID,
  }) != null;
}
