Feature: Criar projeto

  Scenario: C4H1 - Adicionar um projeto com todos os campos preenchidos
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When clico no botão criar projetos
    And seleciono a última opção do dropdown
    And preencho o destino com "Alemanha"
    And seleciono o tipo de intercâmbio "Idioma"
    And seleciono o status "Progredindo"
    Then clico em "Salvar" e confirmo

  Scenario: C4H2 - Adicionar projeto sem destino
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When clico no botão criar projetos
    And seleciono a última opção do dropdown
    And preencho o destino com " "
    And seleciono o tipo de intercâmbio "Idioma"
    And seleciono o status "Progredindo"
    And clico em "Salvar" e confirmo
    Then recebo um alerta com a mensagem "Favor insira um destino e um tipo de intercâmbio"

  Scenario: C4H3 - Adicionar projeto sem tipo
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When clico no botão criar projetos
    And seleciono a última opção do dropdown
    And preencho o destino com "França"
    And seleciono o tipo de intercâmbio ""
    And seleciono o status "Progredindo"
    And clico em "Salvar" e confirmo
    Then recebo um alerta com a mensagem "Favor insira um destino e um tipo de intercâmbio"
