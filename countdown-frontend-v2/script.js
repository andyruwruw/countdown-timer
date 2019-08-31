let app = new Vue({
    el: "#app",
    data: {
        currCounter: 0,
        currStop: 0,

        currTime: new Date(),

        switch: false,

        counters: [
            {stops: 
                [
                    {title: "Poop time", time: new Date(this.currTime.getTime() - 6000)},
                    {title: "Mess Around", time: new  Date(this.currTime.getTime() + 6000)},
                    {title: "Poop time", time: new  Date(this.currTime.getTime() + 120000)},
                ]
            }
        ],
    },
    methods: {
        count() {
            this.switch = true;
        },
        updateCircle() {
            let currTime = new Date();
            console.log(this.counters[this.currCounter].stops)
            console.log(this.currStop + 1)
            let lastStop = this.counters[this.currCounter].stops[this.currStop].time.getTime();
            let nextStop = this.counters[this.currCounter].stops[this.currStop + 1].time.getTime();
            let gap = nextStop - lastStop;
            let progress = currTime.getTime() - lastStop;
            let percent = progress / gap;
            let firstValue = percent * 360;
            let secondValue = 0;
            if (firstValue > 180) {
                firstValue = 180;
                secondValue = percent * 360 - 180;
            }

            let root = document.documentElement;
            root.style.setProperty('--firstValue', firstValue);
            root.style.setProperty('--secondValue', secondValue);

        },
        requestTimes() {

        }
    },
    computed: {
        remaining() {
            let remainder = [];
            if (this.switch == true) {
                this.switch = false;
            }
            let currTime = new Date();
            let diff = this.counters[this.currCounter].stops[this.currStop + 1].time.getTime() - currTime.getTime();

            let years = Math.round(diff / (1000 * 3600 * 24 * 365));
            let months = Math.round(diff / (1000 * 3600 * 24 * 31)) % 12;
            let days = Math.round(diff / (1000 * 3600 * 24)) % 31;
            let hours = Math.round(diff / (1000 * 3600)) % 24;
            let minutes = Math.round(diff / (1000 * 60)) % 60;
            let seconds = Math.round(diff / (1000)) % 60;

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
            console.log(seconds);
            if (remainder.length == 0) {
                if (this.currStop < this.counters[this.currCounter].stops.length) {
                    this.currStop += 1;
                }
                else {
                    this.requestTimes();
                }
            }
            this.updateCircle();
            return remainder;
        },
    },
    async created() {
        //await this.$store.dispatch("sampleCounter");
        this.interval = setInterval(this.count, 1000);
    }
});
