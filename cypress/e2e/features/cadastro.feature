Feature: Cadastro de usuário

  Scenario: C2H1 - Cadastrar novo usuário com sucesso
    Given Eu acesso a página inicial
    When Eu clico no link "Cadastre-se"
    And Eu preencho o nome com "Teste01"
    And Eu preencho o e-mail com "Teste01@gmail.com"
    And Eu preencho a senha com "teste"
    And Eu preencho a confirmação de senha com "teste"
    And Eu preencho a data de nascimento com "2000-01-01"
    And Eu clico no botão submit
    Then Eu devo ser redirecionado com sucesso

  Scenario: C2H2 - Cadastrar sem confirmação de senha
    Given Eu acesso a página inicial
    When Eu clico no link "Cadastre-se"
    And Eu preencho o nome com "Teste01"
    And Eu preencho o e-mail com "Teste01@gmail.com"
    And Eu preencho a senha com "teste"
    And Eu preencho a data de nascimento com "2000-01-01"
    And Eu clico no botão submit
    Then Não devo ser redirecionado para lugar nenhum

  Scenario: C2H3 - Cadastrar sem nome
    Given Eu acesso a página inicial
    When Eu clico no link "Cadastre-se"
    And Eu preencho o e-mail com "Teste01@gmail.com"
    And Eu preencho a senha com "teste"
    And Eu preencho a confirmação de senha com "teste"
    And Eu preencho a data de nascimento com "2000-01-01"
    And Eu clico no botão submit
    Then Não devo ser redirecionado para lugar nenhum
