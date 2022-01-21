describe('ingredient modal works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3006')
  })

  beforeEach(() => {
    cy.get('[data-cy="ingredient-card"]').first().as('ingredientCard').click()
    cy.url().should('include', '/ingredients/')
    cy.get('[data-cy="ingredient-modal"]').as('ingredientModal')
  })

  it('should close modal by click on button', function () {
    cy.get('@ingredientModal').find('[data-cy="close-button"]').click()
    cy.url().should('not.include', '/ingredients/')
    cy.get('@ingredientModal').should('not.exist');
  })

  it('should close modal by click on overlay', function () {
    cy.get('[data-cy="overlay"]').click({force: true})
    cy.url().should('not.include', '/ingredients/')
    cy.get('@ingredientModal').should('not.exist');
  })

  it('should close modal by esc', function () {
    cy.get('body').type('{esc}')
    cy.url().should('not.include', '/ingredients/')
    cy.get('@ingredientModal').should('not.exist');
  })
})
