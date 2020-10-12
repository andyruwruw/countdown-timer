<template>
  <v-app
    id="countdown-timer"
    :style="{
      'background': backgroundColor,
    }">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('user', [
      'user',
      'backgroundColor',
      'dark',
    ]),
    ...mapGetters('event', [
      'eventsPresent',
    ]),
    ...mapGetters('calendar', [
      'calendarsPresent',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'getUser',
      'checkStatus',
    ]),
    ...mapActions('event', [
      'getEvents',
    ]),
    ...mapActions('calendar', [
      'getCalendars',
    ]),
    closeSettings() {
      this.dialog = false;
    },
  },
  watch: {
    user(value) {
      if (value === null && this.$route.name !== 'Landing') {
        this.$router.push('/');
      } else {
        if (!this.eventsPresent && !this.calendarsPresent) {
          this.getEvents();
          this.getCalendars();
        }

        if (this.$route.name !== 'Home') {
          this.$router.push('/home');
        }
      }
    }
  },
  async created() {
    const loggedIn = await this.checkStatus();

    if (!loggedIn && this.$route.name !== 'Landing') {
      this.$router.push('/');
    } else if (loggedIn) {
      this.getUser();
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
}

.v-app-bar .v-toolbar__content {
  opacity: 1;
  transition: all .3s ease;
}

.v-app-bar.logged-in .v-toolbar__content {
  opacity: 0;
}

.v-app-bar.logged-in .v-toolbar__content:hover {
  opacity: 1;
}

.title {
  margin: 0;
}

.app-bar-content {
  width: 100%;
}
</style>
