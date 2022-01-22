describe('drag and drop work correctly', function () {

  beforeEach(() => {
    cy.visit('http://localhost:3006')
    cy.get('[class^=burger-constructor_section__]').as('constructorSection')
  })

  it('should handle drag & drop sauce', function () {

    cy.get('[data-cy="ingredient-card"]').contains('Соус').parent().as('sauce')

    cy.get('@sauce').find('[class^=counter_counter__num__]').should('not.exist')
    cy.get('[class^=burger-constructor_total__]').should('not.exist')

    cy.get('@sauce').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')

    cy.get('[class^=burger-constructor_total__]').as('hiddenBlock')
    cy.get('@hiddenBlock').should('exist')
    cy.get('@sauce').find('[class^=counter_counter__num__]').as('ingredientCount')
    cy.get('[class^=burger-constructor_list]').as('constructorList')

    cy.get('@ingredientCount').should('contain', '1')
    cy.get('@constructorList').find('li').should('have.length', 1)
  })

  it('should handle drag & drop bun', function () {

    cy.get('[data-cy="ingredient-card"]').contains('булка').parent().as('bun')

    cy.get('@bun').find('[class^=counter_counter__num__]').should('not.exist')
    cy.get('[class^=burger-constructor_total__]').should('not.exist')

    cy.get('@bun').trigger('dragstart')
    cy.get('@constructorSection').trigger('drop')

    cy.get('[class^=burger-constructor_total__]').as('hiddenBlock')
    cy.get('@hiddenBlock').should('exist')
    cy.get('@bun').find('[class^=counter_counter__num__]').as('ingredientCount')
    cy.get('[class^=burger-constructor_list]').as('constructorList')

    cy.get('@ingredientCount').should('contain', '2')
    cy.get('@constructorList').find('li').should('have.length', 2)
  })
})