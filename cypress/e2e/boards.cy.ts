describe('Boards', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click on the first organization to view its boards
    cy.get('[data-cy="org-item"]').first().click()
  })

  it('displays boards list', () => {
    cy.get('h2').should('contain', 'Boards')
    cy.get('button').contains('New Board').should('be.visible')
  })

  it('can create a new board', () => {
    const boardName = `Test Board ${Date.now()}`
    
    cy.get('button').contains('New Board').click()
    cy.get('input[placeholder="Board name"]').type(boardName)
    cy.get('button').contains('Create').click()
    
    cy.contains(boardName).should('be.visible')
    cy.get('.Toaster').should('contain', 'Board created successfully')
  })

  it('can edit a board', () => {
    const newName = `Updated Board ${Date.now()}`
    
    cy.get('[data-cy="board-item"]').first().within(() => {
      cy.get('button').contains('Edit').click()
    })
    
    cy.get('input').clear().type(`${newName}{enter}`)
    cy.contains(newName).should('be.visible')
    cy.get('.Toaster').should('contain', 'Board updated successfully')
  })

  it('can navigate back to organizations', () => {
    cy.get('button').contains('Back').click()
    cy.get('h2').should('contain', 'Organizations')
  })
})