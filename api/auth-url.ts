import { NowRequest, NowResponse } from '@vercel/node';

import { getAuthURL } from '../util/google';

/**
 * Auth URL
 * Returns a URL by which the user can sign in via Google
 * @param {NowRequest} req 
 * @param {NowResponse} res 
 * @returns {String} Google Auth URL
 */
export default async function (req: NowRequest, res: NowResponse) {
  return res.status(200).send(await getAuthURL());
}
