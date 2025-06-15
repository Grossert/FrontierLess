Feature: Filtro de países

  Scenario: C3H1 - Testar o filtro de países por destino
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    When Eu preencho o campo de destino com "Alemanha"
    Then Os projetos exibidos devem estar relacionados ao destino "Alemanha"

  Scenario: C3H2 - Testar o filtro de países por status
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    When Eu seleciono o status "abandonado"
    Then Os projetos exibidos devem ter o status "abandonado"

  Scenario: C3H3 - Testar o filtro de países por tipo
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    When Eu seleciono o tipo de intercâmbio "pesquisa"
    Then Os projetos exibidos devem ter o tipo "pesquisa"
