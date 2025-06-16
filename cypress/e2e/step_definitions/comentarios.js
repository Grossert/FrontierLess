import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let contArticle = 0;

When('clico no projeto {string}', (projeto) => {
  cy.contains(projeto, { timeout: 10000 }).should('exist').click();
  
  // cy.get('#comment', { timeout: 10000 })
  //   .should('exist')
  //   .should('be.visible')
  //   .should('not.be.disabled');

  cy.get('div.py-2.px-4.bg-white.rounded-lg.rounded-t-lg.border.border-gray-200', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .should('not.be.disabled')
  
  cy.contains('button[type="button"]', 'Postar comentário', { timeout: 10000 })
    .should('exist')
    .should('be.visible')
    .should('not.be.disabled')
    .should('not.have.attr', 'disabled')
});

When('eu adiciono um comentário com o texto {string}', (texto) => {
  cy.get('#comment').type(texto);
});

When('seleciono a estrela 4', () => {
  cy.get('div.cursor-pointer').eq(3)
    .should('be.visible')
    .click();
});

When('clico em {string}', (botao) => {
  cy.contains('button[type="button"]', botao).click();
});

Then('eu deleto o último comentário', () => {
    cy.get('article').last().find('button').filter(':has(svg.w-4.h-4)').click({ force: true });
    cy.contains('button', 'Remover').should('be.visible').click();
});

Then('o último comentário deve ser {string}', (texto) => {
  cy.wait(5000);
  cy.contains("Rússia").should('exist').click();
  cy.get('article')
    .filter(':contains("TESTANDO")')
    .last()
    .should('exist')
    .within(() => {
      cy.contains(texto).should('be.visible').should('exist');
    });
});
