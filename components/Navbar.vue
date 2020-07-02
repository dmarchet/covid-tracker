<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Aggregated COVID Info</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/states">States</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class NavBar extends Vue {}
</script>

<style scoped></style>
