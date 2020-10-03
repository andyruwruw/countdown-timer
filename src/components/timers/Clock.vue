<template>
  <vue-p5
    v-on="{ setup, draw }"
    :class="$style.component">
  </vue-p5>
</template>

<script>
import VueP5 from 'vue-p5';
import { mapGetters, mapActions } from 'vuex';

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
    ...mapActions('event', [
      'eventExpired',
    ]),
    setup(sketch) {
      sketch.resizeCanvas(this.size, this.size);
      this.currSize = this.size;

      sketch.noStroke();
    },
    draw(sketch) {
      if (this.nextEvent) {
        let now = (new Date()).getTime();
        if (this.nextStop < now) {
          this.eventExpired();
        }
        if (this.currSize !== this.size) {
          sketch.resizeCanvas(this.size, this.size);
          this.currSize = this.size;
        }
        sketch.clear();
        sketch.background(this.backgroundColor);
        let completion = now / (this.nextStop - this.lastStop) * 360;

        sketch.fill('rgba(0,0,0,.1)');
        sketch.arc(
          (this.size / 2) + 3,
          (this.size / 2) + 3,
          this.size - 8,
          this.size - 8,
          sketch.radians(0),
          sketch.radians(360)
        );

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
            this.size - 8,
            this.size - 8,
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
      'nextStop',
      'lastStop',
    ]),
  },
};
</script>

<style module>
.component {
  display: flex;
  justify-content: center;
}
</style>