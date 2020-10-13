<template>
  <div :class="$style.component">
    <p :class="$style['time-til']">
      {{ timeTil }}
    </p>

    <v-tooltip
      bottom
      color="rgba(0,0,0,.2)">
      <template v-slot:activator="{ on, attrs }">
        <p
          v-bind="attrs"
          v-on="on"
          :class="$style.title"
          :style="{ 'maxWidth': `${size}px` }">
          {{ title }}
        </p>
      </template>

      <p class="event-time">
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
  name: 'RemainingSimple',
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
      'timeTil',
    ]),
    eventTime() {
      return moment(this.events[0].time).format("dddd, MMMM Do YYYY, h:mm a"); 
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
  watch: {
    timeTil() {
      if (this.timeTil !== '') {
        document.title = this.timeTil;
      }
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

.time-til {
  font-size: 5rem;
}

.title {
  font-size: 3rem;
}

.event-time {

}
</style>