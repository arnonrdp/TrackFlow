const { defineConfig } = require('cypress')

module.exports = defineConfig({
  videosFolder: 'cypress/videos',
  video: true,
  e2e: {
    baseUrl: 'http://localhost:5173'
  }
})
