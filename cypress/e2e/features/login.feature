Feature: Funcionalidade de Login

  Scenario: C1H1: Testar o Login
    Given Eu acesso a página inicial
    When Eu clico no link "Login"
    And Eu preencho o campo de e-mail com "teste@teste.com"
    And Eu preencho o campo de senha com "teste"
    And Eu clico no botão submit
    Then Eu devo ser redirecionado com sucesso

  Scenario: C1H2: Testar o Login sem colocar um email
    Given Eu acesso a página inicial
    When Eu clico no link "Login"
    And Eu preencho o campo de senha com "teste"
    And Eu clico no botão submit
    Then Não devo ser redirecionado para lugar nenhum

  Scenario: C1H3: Testar o Login sem colocar uma senha
    Given Eu acesso a página inicial
    When Eu clico no link "Login"
    And Eu preencho o campo de e-mail com "teste@teste.com"
    And Eu clico no botão submit
    Then Não devo ser redirecionado para lugar nenhum
