describe('Cards', () => {
  beforeEach(() => {
    cy.visit('/')
    // Navigate to a board
    cy.get('[data-cy="org-item"]').first().within(() => {
      cy.get('[data-cy="select-org-button"]').click()
    })
    cy.get('[data-cy="board-item"]').first().within(() => {
      cy.get('[data-cy="select-board-button"]').click()
    })
  })

  it('can create a new card', () => {
    const cardName = `Test Card ${Date.now()}`
    
    cy.get('[data-cy="list-item"]').first().within(() => {
      cy.get('[data-cy="add-card-button"]').click()
      cy.get('[data-cy="card-name-input"]').type(cardName)
      cy.get('[data-cy="create-card-submit"]').click()
    })
    
    cy.contains(cardName).should('be.visible')
    cy.get('.Toaster').should('contain', 'Card created successfully')
  })

  it('can delete a card', () => {
    cy.get('[data-cy="card-item"]').first().within(() => {
      cy.get('[data-cy="delete-card-button"]').click()
    })
    
    cy.on('window:confirm', () => true)
    cy.get('.Toaster').should('contain', 'Card deleted successfully')
  })

  it('can drag and drop cards between lists', () => {
    const cardSelector = '[data-cy="card-item"]'
    const listSelector = '[data-cy="list-item"]'
    
    // Get the first card's content
    cy.get(cardSelector).first().invoke('text').then((cardText) => {
      // Drag the card to the second list
      cy.get(cardSelector).first().drag(cy.get(listSelector).eq(1))
      
      // Verify the card is in the new list
      cy.get(listSelector).eq(1).contains(cardText).should('exist')
    })
  })
})