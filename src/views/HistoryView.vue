<template>
  <main>
    <q-table data-test="history-table" :rows="routesStore.trackedList" title="Tracked Routes" />
  </main>
</template>

<script setup>
import { useRoutesStore } from '@/stores/routes'

const routesStore = useRoutesStore()
</script>
