<template>
  <v-app
    id="countdown-timer"
    :style="{
      'background': backgroundColor,
    }">
    <v-app-bar
      app
      color="rgba(0,0,0,0)"
      flat
      class="app-bar">
      <div
        class="logo"
        @click="goHome">
        <img src="./assets/logo.svg"/>

        <p>
          countdown timer
        </p>
      </div>

      <v-spacer></v-spacer>

      <div class="actions">
        <v-btn
          icon
          href="https://github.com/andyruwruw/countdown-timer">
          <v-icon color="black">{{ github }}</v-icon>
        </v-btn>

        <v-dialog
          v-if="eventsPresent"
          v-model="dialog"
          width="100%"
          max-width="1000">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on">
              <v-icon color="black">mdi-cog</v-icon>
            </v-btn>
          </template>

          <settings-component />
        </v-dialog>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { mdiGithub } from '@mdi/js';
import SettingsComponent from './components/modals/settings/SettingsComponent.vue';

export default {
  name: 'App',
  components: {
    SettingsComponent,
  },
  data: () => ({
    github: mdiGithub,
    dialog: false,
  }),
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
    goHome() {
      if (this.$route.name !== 'Home') {
        this.$router.push('/home');
      }
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

.v-app-bar {
  opacity: 0;
  transition: all .3s ease !important;
}

.v-app-bar:hover {
  opacity: 1;
}

.title {
  margin: 0;
}

.logo {
  cursor: pointer;
}

.logo p {
  margin: 0 0 0 .3rem !important;
  color: rgba(0, 0, 0, 0.932);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 1.5rem;
}

.app-bar-content {
  width: 100%;
}
</style>
