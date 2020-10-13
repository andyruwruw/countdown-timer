<template>
  <div :class="$style.component">
    <div :class="$style.content">
      <loading />

      <p>
        Authenticating with Google
      </p>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
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
    await this.authenticate(this.$route.query.code);
  },
};
</script>

<style module>
.component {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
}

.content p {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: rgb(90, 90, 90);
}
</style>