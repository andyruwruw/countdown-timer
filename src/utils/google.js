import google from 'googleapis';

const {
  ENVIRONMENT,
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  ENVIRONMENT === 'develop' ? 'http://localhost:8080' : 'https://andyruwruw.github.io/countdown-timer/',
);

export const getAuthURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });
}



