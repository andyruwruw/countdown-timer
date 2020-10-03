<template>
  <div
    v-resize="onResize"
    :class="$style.home">
    <div :class="$style.background">
      <clock :size="size"/>
    </div>

    <time-remaining
      :class="$style['time-remaining']"
      :size="size"/>
  </div>
</template>

<script>
import TimeRemaining from '@/components/timers/TimeRemaining';
import Clock from '@/components/timers/Clock';

export default {
  name: 'Home',
  components: {
    TimeRemaining,
    Clock,
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
    size() {
      return Math.min(800, Math.min(this.windowSize.x, this.windowSize.y) * .8);
    }
  }
}
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
</style>
