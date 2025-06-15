import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('clico no botão criar projetos', () => {
    cy.wait(5000)
    cy.get('button[title="Cria Projeto"]').click()
    cy.wait(5000)
});

When('seleciono a última opção do dropdown', () => {
  cy.get('div.flex.justify-between.p-4.w-full.h-full').last().click();
});

When('preencho o destino com {string}', (destino) => {
  cy.get('input[id="destination"]').clear().type(destino);
});

When('seleciono o tipo de intercâmbio {string}', (tipo) => {
  cy.get('select[id="exchangeType"]').select(tipo);
});

When('seleciono o status {string}', (status) => {
  cy.get('select[id="status"]').select(status);
});

Then('clico em {string} e confirmo', (botao) => {
  cy.contains(botao).click();
  cy.contains('Sim, tenho certeza').click();
});

Then('recebo um alerta com a mensagem {string}', (mensagem) => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(mensagem);
  });
});
