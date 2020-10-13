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

      <div>
        <p>
          {{ username }}
        </p>

        <v-btn
          color="warning"
          outlined
          @click="signOut">
          Sign Out
        </v-btn>
      </div>
    </div>

    <div :class="$style.section">
      <p :class="$style.subheader">
        Calendars
      </p>

      <div>
        <v-checkbox
          v-for="item in (calendarMap || [])"
          :key="`settings-calendar-${item.id}`"
          :input-value="calendarMap[item.id].show"
          @mouseup="toggleCalendar(item.id)"
          :label="`${item.summary}`"
          dense
          hide-details>
        </v-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountSettings',
  data: () => ({
    calendarMap: {},
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
    ...mapActions('user', [
      'logout',
    ]),
    toggleCalendar(id) {
      this.calendarMap[id].show = !this.calendarMap[id].show;

      const active = [];

      for (let calendar in this.calendarMap) {
        if (this.calendarMap[calendar].show) {
          active.push(this.calendarMap[calendar].id);
        }
      }

      console.log(active);

      this.$emit('change', { calendars: active });
    },
    signOut() {
      this.logout();
      this.$emit('close');
    },
  },
  created() {
    for (let i = 0; i < this.calendars.length; i++) {
      const enabled = this.user.calendars.includes(this.calendars[i].id);
      const primaryEnabled = this.user.calendars.includes('primary');
      const primary = this.calendars[i].primary || false;

      this.calendarMap[this.calendars[i].id] = {
        id: this.calendars[i].id,
        show: enabled || (primary && primaryEnabled),
        summary: this.calendars[i].summary,
      };
    }
    console.log(this.calendarMap);
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