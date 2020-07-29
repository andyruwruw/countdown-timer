import { NowRequest, NowResponse } from '@vercel/node';
import mongoose from 'mongoose';

import { User } from '../models/user';
import { parseCookie } from '../util/auth';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@countdown-timer.fijoq.mongodb.net/countdown-timer?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function (req: NowRequest, res: NowResponse) {
  const { userID } = await parseCookie(req);
  const changes = req.body;

  const user = await User.updateOne({
    username: userID,
  }, {
    $set: changes,
  });
  return res.send(user);
};

