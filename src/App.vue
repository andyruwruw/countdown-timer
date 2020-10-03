<template>
  <v-app
    id="countdown-timer"
    :style="{
      'background': backgroundColor,
    }">
    <v-app-bar
      app
      color="transparent"
      elevation="0"
      :class="{
        'logged-in': user,
      }"
      :dark="dark">
      <div class="d-flex align-center justify-space-between app-bar-content">
        <span class="title">
          countdown timer
        </span>

        <div class="d-flex align-center justify-flex-end">
          <v-btn
            v-if="!user"
            :text="true"
            @click="login">
            Sign in with Google
          </v-btn>

          <div v-if="user">
            <v-dialog
              v-model="dialog"
              width="90vw"
              max-width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  
                  v-bind="attrs"
                  v-on="on"
                  :text="true">
                  Settings
                </v-btn>
              </template>

              <settings-component @close="closeSettings"/>
            </v-dialog>
          </div>

          <v-btn
            v-if="user"
            :text="true"
            @click="logout">
            Logout
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SettingsComponent from '@/components/modals/settings/SettingsComponent.vue';

export default {
  name: 'App',
  components: {
    SettingsComponent,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters('user', [
      'user',
      'backgroundColor',
      'dark',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'getUser',
      'checkStatus',
      'login',
      'logout',
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
      if (!value && this.$route.name !== 'Landing') {
        this.$router.push('/landing');
      } else {
        this.getEvents();
        this.getCalendars();
      }
    }
  },
  async created() {
    const loggedIn = await this.checkStatus();

    if (!loggedIn && this.$route.name !== 'Landing') {
      this.$router.push('/landing');
    } else if (loggedIn) {
      this.getUser();
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

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
