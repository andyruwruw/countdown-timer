<template>
  <div :class="$style.authenticate">
    <img src="../assets/loading.svg"/>

    <p>
      Authenticating with Google
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Authenticate',
  async created() {
    const code = this.$route.query.code;
    await this.authenticate(code);
  },
  methods: {
    ...mapActions('user', [
      'authenticate',
    ]),
  },
  computed: {
    ...mapGetters('user', [
      'user',
    ]),
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style module>
.authenticate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>