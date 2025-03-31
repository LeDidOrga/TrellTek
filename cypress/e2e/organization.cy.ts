describe("tester les Organizations", () => {
    it("créer un organization", () => {
        cy.visit("/");

        cy.wait(500)
        
        cy.contains("Add Item").click();
        
        cy.get('input').type('Hello, World')
        
        cy.get('button').first().click();
        cy.wait(500)
    })
    
    it("supprimer un organization", () => {
        cy.visit("/");

        cy.wait(500)

        cy.get('button.delete-button').first().click();

        cy.on('window:confirm', () => true);
        cy.wait(500)
    })

    it("update un organization", () => {
        cy.visit("/");

        cy.wait(500)

        cy.get('button.edit-button').first().click();

        cy.get('input').type('Hello, World')
        
        cy.get('button.check-button').first().click();
        cy.wait(500)
    })
})