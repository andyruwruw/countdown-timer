<template>
  <div
    v-resize="onResize"
    :class="$style.home">
    <div :class="$style.background">
      <clock :size="size"/>
    </div>

    <time-remaining :class="$style['time-remaining']"/>
    
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
}

.time-remaining {
  position: relative;
}

.background {
  position: absolute;
  left: 0;
  right: 0;
}

.div {
  color: hsl(0, 7%, 95%);
  color: hsl(0, 100%, 38%);
  color: hsl(0, 100%, 29%);
  color: hsl(0, 100%, 23%);
  color: hsl(0, 0%, 78%);
  color: hsl(2, 100%, 80%);
  color: hsl(7, 88%, 61%);
  color: hsl(7, 94%, 37%);
  color: hsl(12, 81%, 48%);
  color: hsl(23, 100%, 44%);
  color: hsl(26, 89%, 83%);
  color: hsl(32, 100%, 49%);
  color: hsl(38, 48%, 72%);
  color: hsl(39, 100%, 43%);
  color: hsl(41, 100%, 50%);
  color: hsl(45, 100%, 50%);
  color: hsl(48, 69%, 84%);
  color: hsl(48, 95%, 50%);
  color: hsl(51, 100%, 92%);
  color: hsl(53, 100%, 27%);
  color: hsl(62, 23%, 72%);
  color: hsl(71, 95%, 92%);
  color: hsl(80, 59%, 58%);
  color: hsl(140, 48%, 76%);
  color: hsl(153, 23%, 60%);
  color: hsl(154, 10%, 14%);
  color: hsl(156, 42%, 56%);
  color: hsl(178, 100%, 34%);
  color: hsl(186, 75%, 38%);
  color: hsl(191, 100%, 29%);
  color: hsl(192, 93%, 05%);
  color: hsl(192, 100%, 14%);
  color: hsl(198, 71%, 84%);
  color: hsl(207, 57%, 23%);
  color: hsl(274, 39%, 26%);
  color: hsl(340, 64%, 33%);
  color: hsl(344, 53%, 51%);
  color: hsl(344, 50%, 45%);
  color: hsl(346, 100%, 11%);
  color: hsl(349, 100%, 63%);
}
    

</style>
