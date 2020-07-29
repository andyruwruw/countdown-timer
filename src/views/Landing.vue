<template>
  <div class="landing">
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Landing',
  components: {
  },
  methods: {
    ...mapActions('user', [
      'login',
    ]),
  }
}
</script>
