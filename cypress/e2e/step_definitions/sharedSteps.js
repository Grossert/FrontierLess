import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Eu acesso a página inicial", () => {
  cy.visit("http://localhost:3001");
});

When("Eu clico no link {string}", (linkText) => {
  cy.contains("nav a", linkText).click();
});

When("Eu clico no botão submit", () => {
  cy.get('button[type="submit"]').click();
});

Then("Eu devo ser redirecionado com sucesso", () => {
  cy.url().should("not.include", "/login");
});

Then("Não devo ser redirecionado para lugar nenhum", () => {
  cy.url().then((currentUrl) => {
    if (currentUrl.includes("/login")) {
      cy.url().should("include", "/login");
    } else if (currentUrl.includes("/register")) {
      cy.url().should("include", "/register");
    } else {
      throw new Error("URL inesperada: " + currentUrl);
    }
  });
});

//=========================================================================================

Given("Eu estou logado como {string} com a senha {string}", (email, senha) => {
  cy.visit("http://localhost:3001/");
  cy.get('nav a[href="/login"]').click();
  cy.get('#email').type(email);
  cy.get('#password').type(senha);
  cy.get('button[type="submit"]').click();
});


