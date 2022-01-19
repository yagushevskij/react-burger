describe('order works correctly for auth users', function () {
  before(function () {
    cy.visit('http://localhost:3006')
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as('getUserData')
  })

  beforeEach(() => {
    cy.get('[class^=burger-constructor_section__]').as('constructorSection')

    cy.get('[data-cy="ingredient-card"]').contains('Соус').as('sauce')

    cy.get('@sauce').trigger('dragstart')

    cy.get('@constructorSection').trigger('drop')
  })

  it('should handle order creation with sauce only', function () {
    cy.get('[class^=button_button__]').as('orderButton').click()

    cy.get('[data-cy="error-modal"]').as('errorModal')
    cy.get('@errorModal').find('[data-cy="close-button"]').click()
    cy.get('@errorModal').should('not.exist')

    cy.get('[class^=burger-constructor_list]').as('constructorList')
    cy.get('@constructorList').find('li').should('have.length', 1)
  })

  it('should remove ingredient', function () {
    cy.get('[class^=constructor-element__action]').as('deleteButton').click({ multiple: true })
    cy.get('[class^=burger-constructor_list]').should('not.exist')
    cy.get('@sauce').find('[class^=counter_counter__num__]').should('not.exist')
  })

  it('should handle order creation with bun', function () {
    cy.get('[data-cy="ingredient-card"]').contains('булка').as('bun')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')

    cy.get('[class^=button_button__]').as('orderButton').click()
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('orderData')
    cy.get('[data-cy="order-modal"]').as('orderModal')
    cy.get('@orderModal').find('[data-cy="close-button"]').click()
    cy.get('@orderModal').should('not.exist')

    cy.get('@bun').find('[class^=counter_counter__num__]').should('not.exist')

    cy.get('[class^=burger-constructor_list]').should('not.exist')
  })
})

describe('order works correctly for unauth users', function () {
  before(function () {
    cy.visit('http://localhost:3006')
  })

  it('should handle drag & drop cards', function () {
    cy.get('[class^=burger-constructor_section__]').as('constructorSection')
    cy.get('[data-cy="ingredient-card"]').first().as('firstIngredientCard')

    cy.get('@firstIngredientCard').find('[class^=counter_counter__num__]').should('not.exist')
    cy.get('[class^=burger-constructor_total__]').should('not.exist')

    cy.get('@firstIngredientCard').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')

    cy.get('[class^=burger-constructor_total__]').as('hiddenBlock')
    cy.get('@hiddenBlock').should('exist')
    cy.get('@firstIngredientCard').find('[class^=counter_counter__num__]').as('ingredientCount')
    cy.get('[class^=burger-constructor_list]').as('constructorList')

    cy.get('@firstIngredientCard')
      .find('[class^="ingredient-card_card__title__"]')
      .then($title => {
        if ($title.text().includes('булка')) {
          cy.get('@ingredientCount').should('contain', '2')
          cy.get('@constructorList').find('li').should('have.length', 2)
        } else {
          cy.get('@ingredientCount').should('contain', '1')
          cy.get('@constructorList').find('li').should('have.length', 1)
        }
      })
    cy.get('[class^=button_button__]').as('orderButton').click()
    cy.url().should('include', '/login')
  })
})
