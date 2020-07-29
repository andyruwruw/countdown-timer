<template>
  <div :class="$style.component">
    <p :class="$style['time-til']">
      {{ timeTil }}
    </p>

    <p :class="$style.title">
      {{ title }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment';

export default {
  name: 'TimeRemaining',
  computed: {
    ...mapGetters('event', [
      'nextEvent',
      'nextStop',
      'eventActive',
    ]),
    timeTil() {
      if (this.nextStop) {
        return moment(this.nextStop).fromNow(true);
      }
      return '';
    },
    title() {
      if (this.nextEvent) {
        if (this.eventActive) {
          return this.nextEvent.summary;
        }
        return `Until ${this.nextEvent.summary}`;
      }
      return '';
    }
  },
};
</script>

<style module>
.component p {
  text-align: center;
}

.time-til {
  font-size: 5rem;
}

.title {
  font-size: 3rem;
}
</style>