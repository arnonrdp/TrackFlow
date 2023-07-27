/* eslint-disable cypress/no-unnecessary-waiting */

describe('Free Acount', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
    cy.visit('/')
  })

  it('should display the history page', () => {
    cy.get('[data-test="coordinates-from"]').type('-22.905727099408317,-43.27549438072457')
    cy.get('[data-test="coordinates-to"]').type('-21.905727099408317,-43.27549438072457')
    cy.get('[data-test="search-button"]').click()
    cy.wait(3000)

    cy.get('.q-card').should('be.visible')
  })
})
