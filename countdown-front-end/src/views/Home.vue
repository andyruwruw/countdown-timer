<template>
  <div class="home">
    <Counter />
    <Settings />
  </div>
</template>

<script>
// @ is an alias to /src
import Counter from '@/components/Counter.vue'
import Settings from '@/components/Settings.vue'

export default {
  name: 'home',
  components: {
    Counter,
    Settings,
  }
}
</script>
