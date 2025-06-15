import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
require("./sharedSteps");

When("Eu preencho o campo de e-mail com {string}", (email) => {
  cy.get("#email").type(email);
});

When("Eu preencho o campo de senha com {string}", (senha) => {
  cy.get("#password").type(senha);
});