<template>
  <header class="q-mx-auto text-center">
    <q-img src="/logo.svg" width="20rem" />
    <nav>
      <RouterLink active-class="active" to="/">HOME</RouterLink>
      <RouterLink active-class="active" to="/history">HISTORY</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
nav {
  width: 20rem;
  margin: 1rem auto;

  & a {
    border-left: 1px solid $secondary;
    color: $primary;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1.5px;
    padding: 0 1rem;
    text-decoration: none;

    &:first-of-type {
      border: 0;
    }
  }
}

.active {
  background-color: $tprimary;
}
</style>
