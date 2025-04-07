describe("Tester les Boards", () => {
    const randomText = Math.floor(Math.random() * 10000); 

    it("Créer un board", () => {
        cy.visit("/");

        cy.wait(500); 

        cy.get('div.item').first().click();

        cy.contains("Add Item").click();

        cy.get('input').type(`Board-${randomText}`);

        cy.get('button').first().click();

        cy.wait(1000); 

        cy.get('div.card').contains(`Board-${randomText}`).should('exist');
    });

    it("Mettre à jour un board", () => {
        cy.visit("/");

        cy.get('div.item').first().click();

        cy.get('button.edit-button').first().click();

        cy.get('input').clear().type(`Updated-Board-${randomText}`);

        cy.get('button.check-button').click();  
        cy.wait(500); 

        cy.get('div.card').contains(`Updated-Board-${randomText}`).should('exist');
    });

    it("Supprimer un board", () => {
        cy.visit("/");

        cy.wait(500); 

        cy.get('div.item').first().click();

        cy.get('button.delete-button').first().click();

        cy.on('window:confirm', () => true);
        cy.wait(500); 

        cy.get('div.card').contains(`Updated-Board-${randomText}`).should('not.exist');  
    });
});