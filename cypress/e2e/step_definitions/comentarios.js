import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let contArticle = 0;

Given('clico no projeto {string}', (projeto) => {
  cy.wait(5000)
  cy.contains(projeto).should('exist').click();
});

When('eu adiciono um comentário com o texto {string}', (texto) => {
    cy.get('#comment').type(texto)
});

When('seleciono a estrela 4', () => {
    cy.get('div.cursor-pointer').eq(3).click()
    cy.get('button[type="button"]').contains("Postar comentário").click()
});

When('clico em {string}', (botao) => {
    cy.get('button[type="button"]').contains(botao).click()
});

Then('eu deleto o último comentário', () => {
    cy.get('article').last().find('button').filter(':has(svg.w-4.h-4)').click({ force: true });
    cy.contains('button', 'Remover').should('be.visible').click();
});

Then('o comentário {string} deve estar visível na lista de comentários', (texto) => {
  cy.contains('article', texto).should('exist');
});

Then('o último comentário deve ser TESTANDO com 4 estrelas', () => {
  cy.wait(5000);
  cy.contains("Rússia").should('exist').click();
  cy.get('article')
    .filter(':contains("TESTANDO")')
    .last()
    .should('exist')
    .within(() => {
      cy.contains("TESTANDO").should('exist');
    });
});
