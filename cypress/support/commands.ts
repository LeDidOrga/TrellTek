/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to drag and drop elements
       * @example cy.get(source).drag(target)
       */
      drag: (target: Cypress.Chainable<JQuery<HTMLElement>>) => void
    }
  }
}

// Implement drag and drop command
Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, target) => {
  cy.wrap(subject).trigger('mousedown', { button: 0 })
  cy.wrap(target).trigger('mousemove').trigger('mouseup', { force: true })
})