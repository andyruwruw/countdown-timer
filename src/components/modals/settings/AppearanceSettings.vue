<template>
  <div>
    <p
      class="headline"
      :class="$style.title">
      Appearance Settings
    </p>

    <div :class="$style.section">
      <p :class="$style.subheader">
        Colors
      </p>

      <div :class="$style['section-content']">
        <div class="d-flex flex-wrap">
          <v-tooltip
            v-for="(color, index) in colors"
            :key="`color-${index}`"
            top>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                :class="$style['color-chip']"
                :style="{ background: color.background }">
                <div
                  :class="$style.inner"
                  :style="{ 'background': color.primary }">
                  <div
                    :class="$style.segment"
                    :style="{ '--color': color.secondary }" />
                </div>
              </div>
            </template>

            <span>
              {{ color.name }}
            </span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { colorCSS } from '@/utils/colors';

export default {
  name: 'AppearanceSettings',
  computed: {
    ...mapGetters('user', [
      'colors',
      'primaryColor',
      'secondaryColor',
    ]),
  },
  methods: {
    colorCSS: colorCSS,
  },
  created() {
    console.log(this.colors);
  }
}
</script>

<style module>
.title {
  margin: 0;
}

.section{
  display: flex;
  margin: 24px 0;
}

.subheader {
  display: block;
  color: rgba(0, 0, 0, 0.822);
  font-size: 1.1rem;
  width: 120px;
}

.section-content {
  max-width: calc(100% - 120px);
  flex-grow: 1;
}

.color-chip {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  margin: 6px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
  transition: all .3s ease;
}

.color-chip:hover {
  transform: translate(0px, -3px);
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}

.color-chip .inner {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.color-chip .inner .segment {
  --color: #FFFFFF;
  position: absolute;
  height: 100%;
  width: 100%;
  transform: translate(0, -50%) rotate(90deg) rotate(270deg);
  transform-origin: 50% 100%;
  overflow: hidden;
}

.color-chip .inner .segment:before {
  background: var(--color);
  content: '';
  height: 100%;
  position: absolute;
  transform: translate(0, 100%) rotate(90deg);
  transform-origin: 50% 0;
  width: 100%;
}


</style>