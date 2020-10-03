import { NowRequest, NowResponse } from '@vercel/node';
import mongoose from 'mongoose';

import { User, defaultUserObject, userExists }  from '../models/user';
import { getCalendar, getUserID, getToken } from '../util/google';
import { generateToken } from '../util/auth';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@countdown-timer.fijoq.mongodb.net/countdown-timer?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Authenticate
 * Uses code to generate Google Auth Token and returns a user object.
 * @param {NowRequest} req 
 * @param {NowResponse} res 
 * @returns {User} User data.
 */
export default async function (req: NowRequest, res: NowResponse) {
  try {
    const { code } = req.body;
    const token = await getToken(code);

    const calendar = await getCalendar(token);
    const userID = await getUserID(calendar);

    let user;
    if (!await userExists(userID)) {
      user = await defaultUserObject(userID);
      await user.save();
    } else {
      user = await User.findOne({
        username: userID,
      });
    }
    
    let webToken = generateToken({
      userID,
      token,
    }, "24h");

    res.setHeader('Set-Cookie', [`cday-token=${webToken}; SameSite=Strict`]);
    await mongoose.connection.close();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    await mongoose.connection.close();
    return res.status(400).send('U broke it');
  }
}
