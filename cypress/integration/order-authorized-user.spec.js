describe('order works correctly for authorized users', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as('getUserData')
    cy.visit('http://localhost:3006')
    cy.get('[class^=burger-constructor_section__]').as('constructorSection')
    cy.get('[data-cy="ingredient-card"]').contains('Соус').as('sauce')
    cy.get('@sauce').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')
    cy.wait('@getUserData')
  })

  it('should handle order creation with sauce only', function () {
    cy.get('[class^=button_button__]').as('orderButton').click()

    cy.get('[data-cy="error-modal"]').as('errorModal')
    cy.get('@errorModal').find('[data-cy="close-button"]').click()
    cy.get('@errorModal').should('not.exist')

    cy.get('[class^=burger-constructor_list]').as('constructorList')
    cy.get('@constructorList').find('li').should('have.length', 1)
  })

  it('should handle remove ingredient', function () {
    cy.get('[class^=constructor-element__action]').as('deleteButton').click({ multiple: true })
    cy.get('[class^=burger-constructor_list]').should('not.exist')
    cy.get('@sauce').find('[class^=counter_counter__num__]').should('not.exist')
  })

  it('should handle order creation with bun', function () {
    cy.get('[data-cy="ingredient-card"]').contains('булка').as('bun')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('orderData')
    cy.get('[class^=button_button__]').as('orderButton').click()
    cy.get('[data-cy="order-modal"]').as('orderModal')
    cy.get('@orderModal').contains('8398')
    cy.get('@orderModal').find('[data-cy="close-button"]').click()
    cy.get('@orderModal').should('not.exist')

    cy.get('@bun').find('[class^=counter_counter__num__]').should('not.exist')

    cy.get('[class^=burger-constructor_list]').should('not.exist')
  })
})
