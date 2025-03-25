describe('Lists', () => {
  beforeEach(() => {
    cy.visit('/')
    // Navigate to a board
    cy.get('[data-cy="org-item"]').first().click()
    cy.get('[data-cy="board-item"]').first().click()
  })

  it('displays board view', () => {
    cy.get('h2').should('contain', 'Board View')
    cy.get('button').contains('New List').should('be.visible')
  })

  it('can create a new list', () => {
    const listName = `Test List ${Date.now()}`
    
    cy.get('button').contains('New List').click()
    cy.get('input[placeholder="List name"]').type(listName)
    cy.get('button').contains('Create').click()
    
    cy.contains(listName).should('be.visible')
    cy.get('.Toaster').should('contain', 'List created successfully')
  })

  it('can edit a list', () => {
    const newName = `Updated List ${Date.now()}`
    
    cy.get('[data-cy="list-item"]').first().within(() => {
      cy.get('button').contains('Edit').click()
    })
    
    cy.get('input').clear().type(`${newName}{enter}`)
    cy.contains(newName).should('be.visible')
    cy.get('.Toaster').should('contain', 'List updated successfully')
  })

  it('can archive a list', () => {
    cy.get('[data-cy="list-item"]').first().within(() => {
      cy.get('button').contains('Archive').click()
    })
    
    cy.get('.Toaster').should('contain', 'List archived successfully')
  })
})