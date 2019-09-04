var CLIENT_ID = '240364897736-l92t1hd17n06hen63b130f9pju5fvk0e.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAtM_vRxZXAA4U1hfkSUxWGBwiXFhb5tUU';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


function loadedPage() {
    gapi.load('client:auth2', app.initClient);
}

let app = new Vue({
    el: "#app",
    data: {
        stops: [],

        currStop: 0,
        gapPrior: false,

        currTime: new Date(),

        start: null,
        end: null,

        switch: false,
        error: null,

        firstCircle: 0,
        secondCircle: 0,

        windowMin: 0,
        
        countup: 0,

        setup: false,
    },
    methods: {
        signIn() {
            gapi.auth2.getAuthInstance().signIn();
            this.initClient();
        },
        signOut() {
            gapi.auth2.getAuthInstance().signOut();
        },
        async initClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
              }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen();
              }, function(error) {
                this.error = JSON.stringify(error, null, 2);
            });
            this.setup = true;
            await this.listUpcomingEvents();
        }, 
        async lastEvent() {
            let day = 1000 * 60 * 60 * 24;
            let offset = 0;
            let end = this.currTime;
            let today = new Date(this.currTime.getTime() - (this.currTime.getTime() % day));

            while (offset < 2)
            {
                let dayStart = new Date(today.getTime() - day * offset);
                console.log(dayStart);
                console.log(end);
                let response = await gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (dayStart).toISOString(),
                    'timeMax': (end).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 100,
                    'orderBy': 'startTime'
                });
                console.log(response.result.items);
                
                let lastOne = 0;
                for (var i = 0; i < response.result.items.length; i++)
                {
                    if (new Date(response.result.items[i].start.dateTime).getTime() > this.currTime.getTime())
                    {
                        if (i == response.result.items.length - 1) {
                            return response.result.items[i];
                        }
                        if (i == 0)
                        {
                            break;
                        }
                        while (response.result.items[lastOne].start.dateTime == null) {
                            lastOne -= 1;
                        }
                        return response.result.items[lastOne];
                    }
                    else {
                        lastOne = i;
                    }
                }
                offset += 1;
                end = dayStart;
            }
        },
        async listUpcomingEvents() {
            if (this.setup) {
                let response = await gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                });
                if (response.result.items.length > 0)
                {
                    this.stops = [];
                }
    
                for (var i = 0; i < response.result.items.length; i++)
                {
                    if (response.result.items[i].start.dateTime == null) {
                        continue;
                    }
                    let newStop = {title: response.result.items[i].summary, start: new Date(response.result.items[i].start.dateTime), end: new Date(response.result.items[i].end.dateTime)};
                    this.stops.push(newStop);
                }
            }
            // this.stops = response.result.items;
        },
        async count() {
            console.log(this.countup);
            if (this.countup > 50){
                this.countup = 0;
                console.log("Finding Events");
                await this.listUpcomingEvents();
            }
            else {
                this.countup += 1;
            }
            this.currTime = new Date();
            await this.updateStop();
            await this.windowSize();
            this.switch = true;
        },
        updateCircle() {
            let lastStop = this.start;
            let nextStop = this.end;
            let gap = nextStop - lastStop;
            let progress = this.currTime.getTime() - lastStop;
            let percent = progress / gap;
            let firstValue = percent * 360;
            let secondValue = 0;
            if (firstValue > 180) {
                firstValue = 180;
                secondValue = percent * 360 - 180;
            }

            let root = document.documentElement;
            this.firstCircle = firstValue;
            this.secondCircle = secondValue;
        },
        updateStop() {
            if (this.stops.length == 0) {
                return;
            }
            while (this.stops[this.currStop].end.getTime() < this.currTime.getTime()) {
                this.currStop += 1;
            }
            if (this.stops[this.currStop].start.getTime() > this.currTime.getTime()) {
                this.gapPrior = true;
                if (this.currStop - 1 > 0)
                {
                    this.start = this.stops[this.currStop - 1].end.getTime();
                }
                else {
                    if (this.start == null) {
                        this.start = new Date();
                    }
                }
                this.end = this.stops[this.currStop].start.getTime();
            }
            else {
                this.gapPrior = false;
                this.start = this.stops[this.currStop].start.getTime();
                this.end = this.stops[this.currStop].end.getTime();
            }
        },
        toString(remainder) {
            let string = "";
            for (let i = 0; i < remainder.length; i++) {
                if (remainder[i].type == "hours" || remainder[i].type == "hour")
                {
                    string += remainder[i].num;
                    if (i != remainder.length - 1)
                    {
                        string += ":"
                    }
                    else {
                        string += ":00";
                    }
                } 
                else if (remainder[i].type == "minutes" || remainder[i].type == "minute")
                {
                    if (remainder[i].num < 10) {
                        string += "0";
                    }
                    string += remainder[i].num;
                    if (i != remainder.length - 1)
                    {
                        string += ":"
                    }
                    else {
                        string += ":00";
                    }
                }
                else if (remainder[i].type == "seconds" || remainder[i].type == "second")
                {
                    if (remainder[i].num < 10) {
                        string += "0";
                    }
                    string += remainder[i].num;
                }
                else
                {
                    string += remainder[i].num + " " + remainder[i].type + " ";
                }
            }
            console.log("TITLE");
            document.title = string;
        },
        windowSize() {
            this.windowMin = window.innerHeight;
            if (window.innerWidth < this.windowMin)
            {
                this.windowMin = window.innerWidth;
            }
        },
        scroll(down) {
            if (down) {
                window.scroll({
                    top: window.innerHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            else {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    },
    computed: {
        remaining() {
            if (this.switch == true) {
                this.switch = false;
            }
            if (this.stops.length == 0) {
                return;
            }
            
            let remainder = [];
            let diff = this.end - this.currTime.getTime();
        
            let years = Math.floor(diff / (1000 * 3600 * 24 * 365));
            let months = Math.floor(diff / (1000 * 3600 * 24 * 31)) % 12;
            let days = Math.floor(diff / (1000 * 3600 * 24)) % 31;
            let hours = Math.floor(diff / (1000 * 3600)) % 24;
            let minutes = Math.floor(diff / (1000 * 60)) % 60;
            let seconds = Math.floor(diff / (1000)) % 60;

            if (years > 0) {
                let s = "";
                if (years > 1) {
                    s = "s";
                }
                remainder.push({num: years, type: "year" + s});
            }
            if (months > 0) {
                let s = "";
                if (months > 1) {
                    s = "s";
                }
                remainder.push({num: months, type: "month" + s});
            }
            if (days > 0) {
                let s = "";
                if (days > 1) {
                    s = "s";
                }
                remainder.push({num: days, type: "day" + s});
            }
            if (hours > 0) {
                let s = "";
                if (hours > 1) {
                    s = "s";
                }
                remainder.push({num: hours, type: "hour" + s});
            }
            if (minutes > 0) {
                let s = "";
                if (minutes > 1) {
                    s = "s";
                }
                remainder.push({num: minutes, type: "minute" + s});
            }
            if (seconds > 0) {
                let s = "";
                if (seconds > 1) {
                    s = "s";
                }
                remainder.push({num: seconds, type: "second" + s});
            }
            
            this.updateCircle();
            this.toString(remainder);
            return remainder;
        },
    },
    created() {
        this.initClient();
        setInterval(this.count, 100);
        
    }
});

