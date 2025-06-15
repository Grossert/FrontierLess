const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("Eu preencho o campo de destino com {string}", (destino) => {
    cy.wait(5000)
    cy.get('#searchDestination').type(destino);
});

When("Eu seleciono o status {string}", (status) => {
  cy.get('#status').select(status);
});

When("Eu seleciono o tipo de intercâmbio {string}", (tipo) => {
  cy.get('#exchangeType').select(tipo);
});

Then("Os projetos exibidos devem estar relacionados ao destino {string}", (destinoEsperado) => {
  cy.get('button.w-full', { timeout: 10000 }).each(($el) => {
    cy.wrap($el).find('h2').invoke('text').then((textoDoH2) => {
      expect(textoDoH2.trim().toLowerCase()).to.eq(destinoEsperado.trim().toLowerCase());
    });
  });
});

Then("Os projetos exibidos devem ter o status {string}", (statusEsperado) => {
  cy.get('button.w-full', { timeout: 10000 }).each(($el) => {
    cy.wrap($el).find('p').contains(/^Status:/).invoke('text').then((textoDoP) => {
      const statusTexto = textoDoP.split(':')[1]?.trim().toLowerCase();
      expect(statusTexto).to.eq(statusEsperado.trim().toLowerCase());
    });
  });
});

Then("Os projetos exibidos devem ter o tipo {string}", (tipoEsperado) => {
  cy.get('button.w-full', { timeout: 10000 }).each(($el) => {
    cy.wrap($el).find('p').contains(/^Tipo:/).invoke('text').then((textoDoP) => {
      const tipoTexto = textoDoP.split(':')[1]?.trim().toLowerCase();
      expect(tipoTexto).to.eq(tipoEsperado.trim().toLowerCase());
    });
  });
});

