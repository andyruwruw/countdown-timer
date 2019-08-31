<template>
    <div class="counter">
        <div id="background">
            <div id="center-text">
                <div id="time">
                    <div v-for="item in remaining" v-bind:key="item.type" class="item">
                        <h1>{{item.num}}</h1>
                        <h3>{{item.type}}</h3>
                    </div>
                </div>
                <h2>{{counter.stops[0].title}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'counter',
    components: {
    },
    data() {
        return {    
            currStop: 0,
            switch: false,
        }
    },
    methods: {
        count() {
            this.switch = true;
            console.log("hi");
        },
        updateCircle() {

        }
    },
    computed: {
        counter() {
            return this.$store.state.counters[this.$store.state.current];
        },
        remaining() {
            let remainder = [];
            if (this.switch == true) {
                this.switch = false;
            }
            let currTime = new Date();
            let diff = this.counter.stops[this.currStop].time.getTime() - currTime.getTime();

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
            return remainder;
        },
    },
    async created() {
        await this.$store.dispatch("sampleCounter");
        this.interval = setInterval(this.count, 1000);
    }
}
</script>

<style scoped> 
#background {
    display: block;
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgb(247, 87, 87);
}

#center-text {
    z-index: 0;
    width: 100vw;
    margin: 0 auto;
    margin-top: 10%;
}

#time {
    display: flex;
    width: 95vw;
    max-width: 1000px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.item {
    display: block;
    width: 230px;
    margin: 0 15px;
}

h1 {
    font-size: 10em;
    font-weight: lighter;
    margin: 0 auto;
    color: white;
}

h2 {
    font-size: 5em;
    margin: 0 auto;
    margin-top: 20px;
    color: white;
}

h3 {
    font-size: 1em;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.575);
}

.circle {
    display: block;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    width: 40vh; 
    height: 40vh; 
    top: 50px;
    left: calc((100vw - 40vh) / 2);
    background: rgba(238, 238, 238, 0.123);

    border-radius: 100%;
}

.circle-segment { 
    overflow: hidden;
    height: 100%;
    position: absolute;

    transform: translate(0, 0) rotate(0deg) rotate(calc(var(--offset, 0) * 1deg));
    width: 50%;
    transform-origin: 100% 100%;
}

.first {
    margin-left: 50%;
}

.last {
    margin-left: 0%;
    transform-origin: 50% 50%;
    transform: rotate(180deg);
}

.first.circle-segment:before {
    background: rgba(255, 255, 255, 0.509);
    content: '';
    height: 200%;
    position: absolute;
    transform: translate(-125%, -25%) rotate(calc(var(--value, 45) * 1deg));
    transform-origin: 100% 50%;
    width: 200%;
}

.last.circle-segment:before {
    background: rgba(255, 255, 255, 0.509);
    content: '';
    height: 200%;
    position: absolute;
    transform: translate(-125%, -25%) rotate(calc(var(--value, 45) * 1deg));
    transform-origin: 100% 50%;
    width: 200%;
}
</style>

<style scoped>

    
</style>


