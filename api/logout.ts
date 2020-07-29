import { NowRequest, NowResponse } from '@vercel/node';

import { generateToken } from '../util/auth';

export default async function (req: NowRequest, res: NowResponse) {
  try {
    let webToken = generateToken({}, "0");

    res.setHeader('Set-Cookie', [`cday-token=${webToken}; SameSite=Strict`]);

    return res.status(204).send({});
  } catch (error) {
    console.log(error);
    return res.status(400).send('U broke it');
  }
}