import { NowRequest, NowResponse } from '@vercel/node';

export default async function (req: NowRequest, res: NowResponse) {

  return res.status(200).send('Recieved');
}