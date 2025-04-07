describe("tester les Organizations", () => {
    const text = Math.floor(Math.random() * 10000);

    it("créer un organization", () => {
        cy.visit("/");

        cy.wait(500)
        
        cy.contains("Add Item").click();
        
        cy.get('input').type(text)
        
        cy.get('button').first().click();
        cy.wait(1000)
        
        cy.get("div").contains(text).should("exist"); 
    })
    
    it("supprimer une organisation", () => {
        cy.visit("/");
    
        cy.wait(500); 
        
        cy.get('button.delete-button').first().click();
        
        cy.on('window:confirm', () => true);
        cy.wait(500); 
        
        cy.get('div').contains(text).should('not.exist');
    });
    

    it("mettre à jour une organisation", () => {
        cy.visit("/");
    
        cy.wait(500);
        
        cy.get('button.edit-button').first().click(); 

        const newName = Math.floor(Math.random() * 10000);

        cy.get('input').clear().type(newName);
        
        cy.get('button.check-button').first().click();
        cy.wait(1500); 
    });    
})