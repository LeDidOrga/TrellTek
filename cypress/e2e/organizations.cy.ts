describe('Organizations', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays organizations list', () => {
    cy.get('h2').should('contain', 'Organizations')
    cy.get('button').contains('New Organization').should('be.visible')
  })

  it('can create a new organization', () => {
    const orgName = `Test Org ${Date.now()}`
    
    cy.get('button').contains('New Organization').click()
    cy.get('input[placeholder="Organization name"]').type(orgName)
    cy.get('button').contains('Create').click()
    
    cy.contains(orgName).should('be.visible')
    cy.get('.Toaster').should('contain', 'Organization created successfully')
  })

  it('can edit an organization', () => {
    const newName = `Updated Org ${Date.now()}`
    
    cy.get('[data-cy="org-item"]').first().within(() => {
      cy.get('button').contains('Edit').click()
    })
    
    cy.get('input').clear().type(`${newName}{enter}`)
    cy.contains(newName).should('be.visible')
    cy.get('.Toaster').should('contain', 'Organization updated successfully')
  })
})