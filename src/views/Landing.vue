<template>
  <div :class="$style.component">
    <div :class="$style.content">
      <img src="../assets/logo.svg" />

      <h1>
        countdown timer
      </h1>

      <p>
        when seconds count
      </p>

      <v-btn
        v-if="!user"
        dark
        outlined
        large
        color="black"
        @click="login">
        Sign in with Google
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Landing',
  components: {
  },
  methods: {
    ...mapActions('user', [
      'login',
    ]),
  },
  computed: {
    ...mapGetters('user', [
      'user',
      'backgroundColor',
      'dark',
    ]),
  },
}
</script>

<style module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10rem;
}

.content img {
  width: 95%;
  max-width: 8rem;
}

.content p {
  font-size: 1.1rem;
  color: rgb(61, 61, 61);
  padding-bottom: 1.5rem;
}

.content h1 {
  font-size: 2.6rem;
  font-weight: 400;
}
</style>