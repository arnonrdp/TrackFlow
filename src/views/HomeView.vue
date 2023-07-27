<template>
  <main v-if="routesStore?.trackedRoute">
    <q-form class="flex justify-center q-gutter-x-md" @submit="onSearch">
      <q-input data-test="coordinates-from" dense label="From" outlined rounded v-model="coordinatesFrom" />
      <q-input data-test="coordinates-to" dense label="To" outlined rounded v-model="coordinatesTo" />
      <q-btn data-test="search-button" color="primary" icon="search" rounded @click="onSearch" />
    </q-form>
    <q-card
      v-if="Object.keys(routesStore.trackedRoute).includes('distance') || routesStore.loading"
      class="q-mx-auto q-my-md"
      style="width: 30rem; max-width: 90vw"
    >
      <q-card-section v-if="routesStore.loading" class="text-center">
        <h6 class="q-mb-md q-mt-none">Tracking...</h6>
        <q-spinner color="primary" size="3rem" :thickness="5" />
      </q-card-section>

      <q-card-section v-else>
        <h6 class="q-mb-md q-mt-none text-center">You are tracking this route</h6>

        <span class="text-body1">Automatically update every</span>
        <q-input
          class="inline-block q-mx-sm"
          dense
          :min="5"
          style="text-align: center; width: 3rem"
          type="number"
          v-model="interval"
          @update:model-value="onUpdateInterval"
        />
        <span>seconds.</span>

        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="location_on" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Distance</q-item-label>
              {{ routesStore.trackedRoute.distance }} meters
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="traffic" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Traffic Delay</q-item-label>
              {{ routesStore.trackedRoute.trafficDelay }} seconds
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="hourglass_top" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Travel Time</q-item-label>
              {{ routesStore.trackedRoute.travelTime }} seconds
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="dangerous" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Status</q-item-label>
              {{ routesStore.trackedRoute.violated ? 'Closed Road' : 'Road without closures' }}
            </q-item-section>
          </q-item>
        </q-list>
        <div v-if="routesStore.trackedRoute.warnings?.length" class="q-mt-md">
          <q-icon class="q-mr-xs" color="warning" name="warning" size="xs" />
          <span>
            {{ routesStore.trackedRoute.warnings[0].description }} | Distance: {{ routesStore.trackedRoute.warnings[0].details.distance }}m
          </span>
        </div>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup>
import { useRoutesStore } from '@/stores/routes'
import { onMounted, onUnmounted, ref } from 'vue'

const routesStore = useRoutesStore()

const coordinatesFrom = ref('')
const coordinatesTo = ref('')
const interval = ref(5)
const intervalId = ref(null)

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    coordinatesFrom.value = `${position.coords.latitude},${position.coords.longitude}`
  })
})

function onSearch() {
  routesStore.trackRoute(coordinatesFrom.value, coordinatesTo.value).then(() => {
    onInterval()
    routesStore.saveTrackToList()
  })
}

function onInterval() {
  intervalId.value = setInterval(() => {
    routesStore.trackRoute(coordinatesFrom.value, coordinatesTo.value)
  }, interval.value * 1000)
}

function onUpdateInterval() {
  clearInterval(intervalId.value)
  onInterval()
}

onUnmounted(() => {
  console.log('Unmounted')
  clearInterval(intervalId.value)
})
</script>

<style>
main {
  padding: 1rem;
}

.qinput {
  text-align: center;
  width: 18rem;
}
</style>
