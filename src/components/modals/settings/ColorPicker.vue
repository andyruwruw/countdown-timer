<template>
  <div class="d-flex flex-wrap">
    <div
      v-for="(color, index) in colors"
      :key="`color-${index}`"
      :class="$style['color-chip']"
      :style="{
        'background': colorCSS(color),
      }">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { colorCSS } from '@/utils/colors';

export default {
  name: 'ColorPicker',
  ...mapGetters('user', [
    'colors',
  ]),
  methods: {
    colorCSS: colorCSS,
  },
}
</script>

<style module>
.color-chip {
  display: block;
  width: 3rem;
  height: 3rem;
  margin: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
  transition: all .3s ease;
}

.color-chip:hover {
  transform: translate(0px, -3px);
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>