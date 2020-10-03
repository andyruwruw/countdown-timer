import { NowRequest, NowResponse } from '@vercel/node';
import mongoose from 'mongoose';

import { parseCookie } from '../util/auth';
import { userExists } from '../models/user';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@countdown-timer.fijoq.mongodb.net/countdown-timer?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Auth Check
 * Verifies if user is already logged in.
 * @param {NowRequest} req 
 * @param {NowResponse} res 
 * @returns {Object} Logged In Status
 */
export default async function (req: NowRequest, res: NowResponse) {
  try {
    const cookie = await parseCookie(req);
    if (cookie) {
      const { userID } = cookie;

      if (await userExists(userID)) {
        await mongoose.connection.close();
        return res.status(200).send({ valid: true });
      }
    }
    await mongoose.connection.close();
    return res.status(200).send({ valid: false });
  } catch (error) {
    console.log(error);
    await mongoose.connection.close();
    return res.status(400).send('U broke it');
  }
};
