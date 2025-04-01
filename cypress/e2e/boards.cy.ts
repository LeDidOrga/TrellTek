describe("Tester les Boards", () => {
    it("Créer un board", () => {
        cy.visit("/");

        cy.wait(500)

        // Click on the first div with class 'item' to enter the board
        cy.get('div.item').first().click();

        // Click the 'Add Item' button
        cy.contains("Add Item").click();

        // Type the new board name
        cy.get('input').type('Hello, World');

        // Click the first button to save the new board
        cy.get('button').first().click();
        cy.wait(500)
    });
    
    it("Mettre à jour un board", () => {
        cy.visit("/");

        // Click on the first div with class 'item' to enter the board
        cy.get('div.item').first().click();

        // Click the edit button for the first board item
        cy.get('button.edit-button').first().click();

        // Type the new name for the board
        cy.get('input').type('Hello, World');

        // Click the check button to save the updated board
        cy.get('button.check-button').first().click();
        cy.wait(500)
    });

    it("Supprimer un board", () => {
        cy.visit("/");

        cy.wait(500)

        // Click on the first div with class 'item' to enter the board
        cy.get('div.item').first().click();

        // Click the delete button for the first board item
        cy.get('button.delete-button').first().click();

        // Handle the confirmation dialog
        cy.on('window:confirm', () => true);
        cy.wait(500)
    });
});
