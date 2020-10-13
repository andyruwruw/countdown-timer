<template>
  <div
    v-resize="onResize"
    :class="$style.home">
    <div :class="$style.background">
      <clock
        v-if="eventsPresent"
        :size="size"/>
    </div>

    <remaining-simple
      v-if="user !== null && user.textType !== 'verbouse'"
      :class="$style['time-remaining']"
      :size="size"/>

    <remaining-verbouse
      :class="$style['time-remaining']"
      :size="size" />

    <div
      v-if="!eventsPresent"
      :class="$style['loading-events']">
      <loading />

      <p>
        Retrieving your events
      </p>
    </div>
  </div>
</template>

<script>
import RemainingSimple from '@/components/timers/RemainingSimple';
import RemainingVerbouse from '@/components/timers/RemainingVerbouse';
import Clock from '@/components/timers/Clock';
import Loading from '@/components/misc/Loading.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    RemainingSimple,
    RemainingVerbouse,
    Clock,
    Loading,
  },
  data: () => ({
    windowSize: {
      x: 0,
      y: 0,
    },
  }),
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
  computed: {
    ...mapGetters('event', [
      'eventsPresent',
    ]),
    ...mapGetters('user', [
      'user',
    ]),
    size() {
      return Math.min(800, Math.min(this.windowSize.x, this.windowSize.y) * .8);
    },
  },
};
</script>

<style module>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 72px);
}

.time-remaining {
  position: relative;
}

.background {
  position: absolute;
  left: 0;
  right: 0;
}

.loading-events {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
}

.loading-events p {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: rgb(90, 90, 90);
}
</style>
