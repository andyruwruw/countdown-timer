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
          v-for="(item, index) in (calendars || [])"
          :key="`settings-calendar-${index}`"
          v-model="on[index]"
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
    }
  },
  created() {
    for (let i = 0; i < this.calendars.length; i++) {
      if (this.user.calendars.includes(this.calendars[i].id)) {
        this.on.push(true);
      } else if (this.calendars[i].primary && this.user.calendars.includes('primary')) {
        this.on.push(true);
      }else {
        this.on.push(false);
      }
    }
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
</style>

<style>
.v-input--selection-controls {
  margin-top: 0 !important;
  margin-bottom: 8px;
}
</style>