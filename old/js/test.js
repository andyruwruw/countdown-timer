let TEST_ACTIVE = false;
let TEST_DATA = [
    {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-07-27T21:23:57.000Z",
        "updated": "2019-08-30T02:29:08.902Z",
        "summary": "Sleep",
        "colorId": "5",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T00:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T07:30:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-06T00:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 1,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-30T02:32:19.000Z",
        "updated": "2019-08-30T02:38:29.268Z",
        "summary": "CS 260 TA",
        "colorId": "10",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-08T09:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "end": {
         "dateTime": "2019-09-08T11:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "originalStartTime": {
         "dateTime": "2019-09-03T09:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "sequence": 2,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civilization: Music 2 (MUSIC 202)",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-08T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-08T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-06T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
]


let TEST_DATA_DAY = {result: {items: [
    {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-07-27T21:23:57.000Z",
        "updated": "2019-08-30T02:29:08.902Z",
        "summary": "Sleep",
        "colorId": "5",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-07T00:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-07T07:30:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-06T00:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 1,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-30T02:32:19.000Z",
        "updated": "2019-08-30T02:38:29.268Z",
        "summary": "CS 260 TA",
        "colorId": "10",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2015-09-09T09:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "end": {
         "dateTime": "2015-09-09T11:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "originalStartTime": {
         "dateTime": "2019-09-03T09:00:00-06:00",
         "timeZone": "America/Denver"
        },
        "sequence": 2,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civil",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },
       {
        "kind": "calendar#event",
        "status": "confirmed",
        "created": "2019-08-25T04:59:19.000Z",
        "updated": "2019-08-30T02:28:16.830Z",
        "summary": "Civilsdfasdfasdfasdfsadfsda",
        "location": "MARB 206",
        "creator": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "organizer": {
         "email": "test_email@nowhere.com",
         "displayName": "John Ducking Doe",
         "self": true
        },
        "start": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "end": {
         "dateTime": "2019-09-09T11:50:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "originalStartTime": {
         "dateTime": "2019-09-09T11:00:00-06:00",
         "timeZone": "America/Los_Angeles"
        },
        "sequence": 3,
        "reminders": {
         "useDefault": true
        }
       },

]}};