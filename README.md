# countdown timer

Generates countdown timers based on the closest or current event on your google calendar.

Available here.

## Usage Details

---

Countdown timer will display how much time remains until an active event ends, or in lack of a current event, how long until your next event.

Using Google Calendar's API, the application will query your default calendar. More calendars can be added or removed.

In the case of overlapping events, countdown timer will look for the next begining or end of an event.

## Permisions

---

Granting the website access to your google account allows it to view calendars. The only data saved is your username, colors, clock type, text type, and ids of calenders you wish to enable on the app.

```
const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  colors: {
    type: Number,
    default: 0,
  },
  calendars: [
    {
      type: String,
    }
  ],
  clockType: {
    type: String,
    default: 'pie',
  },
  textType: {
    type: String,
    default: 'verbouse',
  },
});
```

Giving access to **email** is the only way to access your email address, so that your account can be directly tied to your email address and preferences accessable on any device. Besides using your email address as an ID, no other data relevant to your email is used.
