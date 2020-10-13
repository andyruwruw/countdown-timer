import { NowRequest, NowResponse } from '@vercel/node';

import { getCalendar } from '../util/google';

/**
 * Calendars
 * Returns a list of the user's calendars.
 * @param {NowRequest} req
 * @param {NowResponse} res
 * @returns {Array<Calendar>} Array of Calendar Items
 */
export default async function (req: NowRequest, res: NowResponse) {
  try {
    const calendar = await getCalendar(req);

    let response = await calendar.calendarList.list({});

    return res.status(200).send(response.data.items);
  } catch (error) {
    console.log(error);
    return res.status(400).send('U broke it');
  }
};
