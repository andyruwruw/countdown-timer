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
  const { userID } = await parseCookie(req);
  
  if (await userExists(userID)) {
    return res.status(200).send({ valid: true });
  }
  return res.status(200).send({ valid: false });
}
