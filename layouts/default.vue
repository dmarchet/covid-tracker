<template>
  <div>
    <NavBar />
    <Nuxt />

    <footer class="text-center" style="padding-top: 20px; color: #526488;">
      Data Source: CovidTracking.com Copyright © 2020 by The Atlantic Monthly
      Group
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '~/components/Navbar.vue'
export default Vue.extend({
  components: {
    NavBar,
  },
})
</script>
