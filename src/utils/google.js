import axios from 'axios';

export const getCalendars = async () => {
  let response = await axios.post('/api/calendars');
  return response.data;
}

export const getEvents = async () => {
  let response = await axios.post('/api/events');
  return response.events;
}