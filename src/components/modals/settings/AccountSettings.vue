<template>
  <div>
    <p
      class="headline"
      :class="$style.title">
      Account Settings
    </p>

    <div :class="$style.section">
      <p :class="$style.subheader">
        Account
      </p>

      <p>
        {{ username }}
      </p>
    </div>

    <div :class="$style.section">
      <p :class="$style.subheader">
        Calendars
      </p>

      <div>
        <v-checkbox
          v-for="(item, index) in (on || [])"
          :key="`settings-calendar-${index}`"
          v-model="on[index].show"
          @mouseup="toggleCalendar(index)"
          :label="`${item.summary}`"
          dense
          hide-details>
        </v-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AccountSettings',
  data: () => ({
    on: [],
  }),
  computed: {
    ...mapGetters('user', [
      'user',
    ]),
    ...mapGetters('calendar', [
      'calendars',
    ]),
    username() {
      if (this.user) {
        return this.user.username;
      }
      return '';
    },
  },
  methods: {
    toggleCalendar() {
      let calendarsOn = [];
      for (let i = 0; i < this.on.length; i += 1) {
        if (this.on[i].show) {
          calendarsOn.push(this.on[i].id);
        }
      }
      this.$emit('change', { calendars: calendarsOn });
    },
  },
  created() {
    for (let i = 0; i < this.calendars.length; i++) {
      const enabled = this.user.calendars.includes(this.calendars[i].id);
      const primary = this.calendars[i].primary;

      this.on.push({
        id: this.calendars[i].id,
        show: enabled || primary,
        summary: this.calendars[i].summary,
      });
    }
  },
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
</style>

<style>
.v-input--selection-controls {
  margin-top: 0 !important;
  margin-bottom: 8px;
}
</style>