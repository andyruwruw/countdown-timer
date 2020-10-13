import { google } from 'googleapis';

import { parseCookie } from './auth';

const {
  ENVIRONMENT,
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  ENVIRONMENT === 'develop' ? 'http://localhost:3000/authenticate/' : 'https://countdown-timer-app.vercel.app/authenticate/',
);

export const getToken = async (code) => {
  try {
    const response = await oAuth2Client.getToken(code);
    const { tokens } = response;
    return tokens;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCalendar = async (req) => {
  let token;
  if ('access_token' in req) {
    token = req;
  } else {
    token = (await parseCookie(req)).token;
  }
  
  await oAuth2Client.setCredentials(token);
  return google.calendar({ version: 'v3', auth: oAuth2Client });
};

export const getUserID = async (calendar) => {
  let response = await calendar.calendarList.list({});

  for (let i = 0; i < response.data.items.length; i++) {
    if (response.data.items[i].primary) {
      return response.data.items[i].id;
    }
  }
}

export const getAuthURL = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/gmail.readonly'],
  });
}