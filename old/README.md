# Countdown-Timer

Generates timers based on the closest or current event on your google calendar.
Available Here: [https://counter.andrewdanielyoung.com](https://counter.andrewdanielyoung.com)

## Permissions

Granting the website access to your google account only allows it to view calendars. All data is kept locally and never saved.

[script.js](./script.js) only makes two server calls, both to the Google Calendar API.

## Usage Details

Countdown-Timer will display how much time remains until an active event ends, or in lack of a current event, how long until your next event. 

Using Google Calendar's API, the application will query your default calendar. Switching calendars is unavailable at the moment.

If two events are active, the timer will default to the event that began first.

Colors can be changed to user preference and the second page of the settings, to the right.

## Further Use

The API key for google calendar is only valid from the URL [https://counter.andrewdanielyoung.com](https://counter.andrewdanielyoung.com), so sadly the code can't be removed from that location.

You can get your own API keys [here (Google API Dashboard)](https://console.developers.google.com/apis/dashboard).

Google requires you to have a *https* website. Best way I found to get this up and running was to use [CertBot](https://certbot.eff.org/).

They turned the whole process into just a few lines into command line.

## Inspiration and Resources

This website was inspired by [Bell.Plus](https://bell.plus/lahs), which I used in highschool. However I wanted to be able to have it linked to my Google Calendar. 

The circular timer was previously a CSS effect found [here (HOW TO: Pure CSS pie charts w/ CSS variables)](https://codeburst.io/how-to-pure-css-pie-charts-w-css-variables-38287aea161e).

It has since then been changed to a canvas element using the P5 library to draw. [Reference here.](https://p5js.org/examples/form-pie-chart.html)

[Google's Guide to Calendar API in Javascript](https://developers.google.com/calendar/quickstart/js)

[Resources for Google Calendar's API](https://developers.google.com/calendar/v3/reference/)


## License

[Available under the MIT license.](./LICENSE.txt)
