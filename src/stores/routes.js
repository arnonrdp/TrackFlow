import axios from 'axios'
import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', {
  state: () => ({
    loading: false,
    trackedRoute: {},
    trackedList: []
  }),

  actions: {
    async trackRoute(from, to) {
      this.loading = true
      await axios
        .get(
          `https://api.myptv.com/routing/v1/routes?waypoints=${from}&waypoints=${to}&apiKey=VVNfZTg0MGRjYTlkYTUxNGQyY2JjM2IwOWIyZThiMjgwZjk6Zjk2M2VlMDMtY2UyOS00Y2YzLTg2NWItYmM3MWZlNjUxNzlh`
        )
        .then((response) => (this.trackedRoute = response.data))
        .finally(() => (this.loading = false))
    },

    saveTrackToList() {
      this.trackedList.push(this.trackedRoute)
    }
  }
})
