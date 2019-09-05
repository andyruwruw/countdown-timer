function HSVtoRGB(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
        
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
        
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
        
    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255), 
            Math.round(g * 255), 
            Math.round(b * 255)
        ];
    }
        
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
        
    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
        
    return [
        Math.round(r * 255), 
        Math.round(g * 255), 
        Math.round(b * 255)
    ];
}

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

var CLIENT_ID = '956722193096-7724hctisdq18jr9s6p5jgmee4cpfoul.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAtM_vRxZXAA4U1hfkSUxWGBwiXFhb5tUU';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


function loadedPage() {
    gapi.load('client:auth2', app.initClient);
}

let app = new Vue({
    el: "#app",
    data: {
        user: null,
        stops: [],

        currStop: 0,
        gapPrior: false,

        currTime: new Date(),

        start: null,
        end: null,

        lastend: null,

        switch: false,
        error: null,

        firstCircle: 0,
        secondCircle: 0,

        windowMin: 0,
        
        countup: 0,

        setup: false,

        saved: false,

        colorTimer: true,
        colorIndex: 0,
        color: "rgb(247, 87, 87)",

        colors: [
            {color: "rgb(71,92,122)", index: 0},
            {color: "rgb(247, 177, 91)", index: 1},
            {color: "rgb(247, 87, 87)", index: 2},
            {color: "rgb(40,40,40)", index: 3},
            {color: "rgb(166,32,106)", index: 4},
            {color: "rgb(86,142,166)", index: 5},
            {color: "rgb(216,115,127)", index: 6},

            {color: "rgb(243,111,56)", index: 7},
            {color: "RGB(60, 179, 113)", index: 8},
            {color: "RGB(30, 144, 255)", index: 9},
            {color: "RGB(75, 0, 130)", index: 10},
            {color: "RGB(128, 0, 0)", index: 11},
            {color: "RGB(25, 25, 112)", index: 12},
            {color: "RGB(112, 128, 144)", index: 13},
        ],
    },
    methods: {
        saveColor() {
            this.saved = true;
            document.cookie = "color = " + this.colorIndex + "; path=/";
            console.log("Preferences Saved");
        },
        signIn() {
            gapi.auth2.getAuthInstance().signIn();
            this.initClient();
        },
        signOut() {
            gapi.auth2.getAuthInstance().signOut();
        },
        chooseColor(chosen) {
            this.saved = false;
            this.colorIndex = chosen;
            if (chosen >= 0 && chosen <= this.colors.length - 1)
            {
                this.color = this.colors[this.colorIndex].color;
            }
        },
        async initClient() {
            try {
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
            } catch (error) {
                console.log(error);
            }
            this.user = "Loading";
            this.setup = true;
            await this.listUpcomingEvents();
            setInterval(this.count, 100);
        },
        async lastEventEnd() {
            let day = 1000 * 60 * 60 * 24;
            let start = new Date(this.currTime.setHours(0,0,0,0));
            let end = new Date(start.getTime() + day);
            return (new Date((await this.findLastEvent(0, start, end)).end.dateTime)).getTime();
        },
        async findLastEvent(offset, start, end) {
            let day = 1000 * 60 * 60 * 24;
            let response = await gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (start).toISOString(),
                'timeMax': (end).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 100,
                'orderBy': 'startTime'
            });
            let potential = null;
            for (var i = 0; i < response.result.items.length; i++)
            {
                if (Object.keys(response.result.items[i].start)[0] == 'date')
                {
                    continue;
                } 
                else if ((new Date(response.result.items[i].start.dateTime)).getTime() > this.currTime.getTime() && potential != null)
                {
                    return response.result.items[potential];
                }   
                else if ((new Date(response.result.items[i].end.dateTime)).getTime() < this.currTime.getTime() && i == response.result.items.length - 1)
                {
                    return response.result.items[i];
                }
                
                potential = i;
            }
            return this.findLastEvent(offset + 1, new Date(start.getTime() - day * (offset + 1)), start);
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
                this.user = response.result.items[0].creator.email;
                let newStops = [];
    
                for (var i = 0; i < response.result.items.length; i++)
                {
                    if (response.result.items[i].start.dateTime == null) {
                        continue;
                    }
                    let newStop = {title: response.result.items[i].summary, start: new Date(response.result.items[i].start.dateTime), end: new Date(response.result.items[i].end.dateTime)};
                    newStops.push(newStop);
                }
                this.stops = newStops;
                this.lastEnd = await this.lastEventEnd();
            }
        },
        async count() {
            this.currTime = new Date();
            await this.windowSize();
            this.switch = true;
        },
        updateCircle() {
            let lastStop = this.start;
            let nextStop = this.end;
            //console.log("THIS");
            //this.printThisPls(lastStop);
           // this.printThisPls(nextStop);
            let gap = nextStop - lastStop;
            let progress = this.currTime.getTime() - lastStop;
            let percent = progress / gap;
            let firstValue = percent * 360;
            let secondValue = 0;
            if (firstValue > 180) {
                firstValue = 180;
                secondValue = percent * 360 - 180;
            }

            this.firstCircle = firstValue;
            this.secondCircle = secondValue;
            if (this.colorIndex == -1)
            {
                if (percent >= 0 && percent <= 1)
                {
                    let inversePercent = 1 - percent;
                    let hue = 115 * inversePercent;
                    let newColor = HSVtoRGB(hue, 100, 73);
                    this.color = "rgb(" + newColor[0] + "," + newColor[1] + "," + newColor[2] + ")";
                }
            }
            else {
                this.color = this.colors[this.colorIndex].color;
            }
        },
        async updateStop() {
            if (this.stops.length == 0) {
                return;
            }
            if (this.end < this.currTime.getTime() || this.start == null) {
                while (this.stops[this.currStop].end.getTime() < this.currTime.getTime()) {
                    this.currStop += 1;
                    if (this.currStop > this.stops.length - 1)
                    {
                        await this.listUpcomingEvents();
                        this.currStop = 0;
                    }
                }

                if (this.stops[this.currStop].start.getTime() > this.currTime.getTime()) {
                    this.gapPrior = true;

                    if (this.currStop == 0)
                    {
                        this.lastEnd = await this.lastEventEnd();
                    }
                    else 
                    {
                        this.lastEnd = this.stops[this.currStop -1].end.getTime();
                    }

                    this.start = this.lastEnd;
                    this.end = this.stops[this.currStop].start.getTime();
                }
                else {
                    this.gapPrior = false;
                    this.start = this.stops[this.currStop].start.getTime();
                    this.end = this.stops[this.currStop].end.getTime();
                }
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

            if (remainder.length == 0) {
                this.updateStop();
                remainder = [{num: 0, type: "seconds"}];
            }

            
            this.updateCircle();
            this.toString(remainder);
            return remainder;
        },
        colorLight() {
            return this.color.substring(0,3) + "a" + this.color.substring(3, this.color.length - 4) + ", .2)"; 
        },
        savedText() {
            if (this.saved) {
                return "Saved";
            }
            else {
                return "Save Preference";
            }
        },
    },
    created() {
        this.initClient();
        var cookie = document.cookie;
        if (cookie.substring(16, 16 + 5) == "color")
        {
            this.saved = true;
            this.colorIndex = parseInt(cookie.substring(22), 10);
            if (this.colorIndex == -1) {
                this.colorTimer = true;
            }
            else {
                this.colorTimer = false;
            }
            console.log("Preferences Loaded");
        }
    }
});

