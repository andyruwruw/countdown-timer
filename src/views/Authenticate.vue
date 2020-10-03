<template>
  <div :class="$style.authenticate">
    <loading />

    <p>
      Authenticating with Google
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/misc/Loading.vue';

export default {
  name: 'Authenticate',
  components: {
    Loading,
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
  },
  methods: {
    ...mapActions('user', [
      'authenticate',
    ]),
  },
  async created() {
    const code = this.$route.query.code;
    await this.authenticate(code);
  },
};
</script>

<style module>
.authenticate {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.authenticate p {
  margin-top: 24px;
}
</style>