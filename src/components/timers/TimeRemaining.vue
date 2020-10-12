<template>
  <div :class="$style.component">
    <p :class="$style['time-til']">
      {{ timeTil }}
    </p>

    <p
      :class="$style.title"
      :style="{ 'maxWidth': `${size}px` }">
      {{ title }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TimeRemaining',
  props: {
    size: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    ...mapGetters('event', [
      'event',
      'lastStop',
      'nextStop',
      'prior',
      'timeTil',
    ]),
    title() {
      if (this.event) {
        if (this.prior) {
          return `Until ${this.event.summary}`;
        }
        return this.event.summary;
      }
      return '';
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
</style>