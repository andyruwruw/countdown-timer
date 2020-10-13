import { NowRequest, NowResponse } from '@vercel/node';
import mongoose from 'mongoose';

import { User } from '../models/user';
import { getCalendar, getUserID } from '../util/google';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@countdown-timer.fijoq.mongodb.net/countdown-timer?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function (req: NowRequest, res: NowResponse) {
  const calendar = await getCalendar(req);
  const userID = await getUserID(calendar);

  const user = await User.findOne({
    username: userID,
  });
  await mongoose.connection.close();
  return res.send(user);
};
