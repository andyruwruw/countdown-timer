import { NowRequest, NowResponse } from '@vercel/node';
import mongoose from 'mongoose';

import { getCalendar, getUserID } from '../util/google';
import { User } from '../models/user';

const {
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@countdown-timer.fijoq.mongodb.net/countdown-timer?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Events
 * Returns an array of the User's Events
 * @param {NowRequest} req
 * @param {NowResponse} res
 * @returns {Array<Event>} Array of Event Objects
 */
export default async function (req: NowRequest, res: NowResponse) {
  try {
    const calendar = await getCalendar(req);
    const userID = await getUserID(calendar);

    const user = await User.findOne({
      username: userID,
    });
    const { calendars } = user || { calendars: ['primary'] };

    let events = [];

    let now = new Date();
    var tomorrow = (new Date(now.getTime() + (24 * 60 * 60 * 1000)));

    for (let i = 0; i < calendars.length; i++) {
      let response = await calendar.events.list({
        calendarId: calendars[i],
        timeMin: now.toISOString(),
        timeMax: tomorrow.toISOString(),
        maxResults: 30,
        singleEvents: true,
        orderBy: 'startTime',
      });

      events = events.concat(response.data.items);
    }

    return res.status(200).send(events);
  } catch (error) {
    console.log(error);
    return res.status(400).send('U broke it');
  }
};