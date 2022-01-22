describe('order works correctly for unauthorized users', function () {
  before(function () {
    cy.visit('http://localhost:3006')
  })

  it('redirect to login page test', function () {
    cy.get('[class^=burger-constructor_section__]').as('constructorSection')
    cy.get('[data-cy="ingredient-card"]').first().as('firstIngredientCard')
    cy.get('@firstIngredientCard').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')
    cy.get('[class^=button_button__]').as('orderButton').click()
    cy.url().should('include', '/login')
  })
})
