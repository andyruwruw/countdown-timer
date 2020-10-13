<template>
  <div :class="$style.component">
    <div :class="$style['interval-container']">
        <div
            v-for="interval in filteredIntervals"
            :key="`interval-${interval.key}`"
            :class="$style.interval">
            <h1>
                {{ interval.value }}
            </h1>

            <p>
                {{ interval.key }}
            </p>
        </div>
    </div>

    <v-tooltip
      bottom
      color="rgba(0,0,0,.2)">
      <template v-slot:activator="{ on, attrs }">
        <p
          v-bind="attrs"
          v-on="on"
          :class="$style.title"
          :style="{ 'maxWidth': `${size}px` }"
          @click="goToEvent">
          {{ title }}
        </p>
      </template>
      
      <p :class="$style['event-time']">
        {{ eventTime }}
      </p>

      <p :class="$style['event-hint']">
        Click to View in Google Calendar
      </p>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'RemainingVerbouse',
  props: {
    size: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    ...mapGetters('event', [
      'eventsPresent',
      'events',
      'prior',
      'remainingIntervals',
    ]),
    eventTime() {
      if (this.eventsPresent) {
        return moment(this.events[0].time).format("dddd, MMMM Do YYYY, h:mm a"); 
      }
      return '';
    },
    filteredIntervals() {
      let titleSet = false;
      let intervals = [];

      for (let key in this.remainingIntervals) {
        if (this.remainingIntervals[key] !== 0) {
          if (!titleSet) {
            document.title = `${this.remainingIntervals[key]} ${key}${(this.remainingIntervals[key] === 1 ? '' : 's')}`
            titleSet = true;
          }

          intervals.push({
            key: `${key}${(this.remainingIntervals[key] === 1 ? '' : 's')}`,
            value: this.remainingIntervals[key],
          });
        }
      }
      return intervals;
    },
    title() {
      if (this.eventsPresent) {
        if (this.prior) {
          return `Until ${this.events[0].name}`;
        }
        return this.events[0].name;
      }
      return '';
    },
  },
  methods: {
    goToEvent() {
      window.location.href = this.events[0].href;
    },
  },
};
</script>

<style module>
.component p {
    margin: 0 auto;
    text-align: center;
    word-wrap: normal;
}

.interval-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.interval {
    padding: 0 1.4rem;
}

.interval h1 {
    font-size: 9rem;
    font-weight: 300;
    line-height: 9rem;
    text-align: center;
}

.interval p {
    font-size: 1.5rem;
    color: rgb(65, 64, 64);
    text-align: center;
}

.time-til {
    font-size: 5rem;
}

.title {
    padding-top: 1rem;
    font-size: 3rem;
}

.event-time {
  font-size: 1.2rem;
  text-align: center;
  margin: .5rem 0 0 !important;
}

.event-hint {
  font-size: .8rem;
  color: rgba(255, 255, 255, 0.795);
  text-align: center;
  margin: .3rem 0 .5rem !important;
}
</style>