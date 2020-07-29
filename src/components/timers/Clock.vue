<template>
  <vue-p5
    v-on="{ setup, draw }"
    :class="$style.component">
  </vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';
import { mapGetters } from 'vuex';
// import { colorCSS } from '@/utils/colors';

export default {
  name: 'Clock',
  components: {
    VueP5,
  },
  data: () => ({
    currSize: 0,
  }),
  props: {
    size: {
      type: Number,
      default: 400,
    },
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(this.size, this.size);
      this.currSize = this.size;

      sketch.noStroke();
    },
    draw(sketch) {
      if (this.nextEvent) {
        if (this.currSize !== this.size) {
          sketch.resizeCanvas(this.size, this.size);
          this.currSize = this.size;
        }

        sketch.clear();
        sketch.background(this.backgroundColor);
      
        let now = (new Date()).getTime();
        let completion = now / (this.end - this.start) * 360;
        let sections = [
          {value: completion, color: this.primaryColor},
          {value: 360 - completion, color: this.secondaryColor}
        ];

        let lastAngle = sketch.radians(-90);

        for (let i = 0; i < sections.length; i++) {
          sketch.fill(sections[i].color);
          sketch.arc(
            this.size / 2,
            this.size / 2,
            this.size,
            this.size,
            lastAngle,
            lastAngle + sketch.radians(sections[i].value)
          );
          lastAngle += sketch.radians(sections[i].value);
        }
      }
    },
  },
  computed: {
    ...mapGetters('user', [
      'primaryColor',
      'secondaryColor',
      'backgroundColor',
    ]),
    ...mapGetters('event', [
      'nextEvent',
    ]),
    start() {
      return this.nextEvent.start.time;
    },
    end() {
      return this.nextEvent.end.time;
    },
  },
};
</script>

<style module>
.component {
  display: flex;
  justify-content: center;
}
</style>