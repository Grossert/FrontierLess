import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
require("./sharedSteps");

When("Eu preencho o nome com {string}", (nome) => {
  cy.get("#name").type(nome);
});

When("Eu preencho o e-mail com {string}", (email) => {
  cy.get("#email").type(email);
});

When("Eu preencho a senha com {string}", (senha) => {
  cy.get("#password").type(senha);
});

When("Eu preencho a confirmação de senha com {string}", (confSenha) => {
  cy.get("#confirmpassword").type(confSenha);
});

When("Eu preencho a data de nascimento com {string}", (data) => {
  cy.get("#birthdate").type(data);
});