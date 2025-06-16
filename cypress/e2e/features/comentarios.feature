Feature: Gerenciamento de Comentários em Projetos

  Scenario: Adicionar comentário simples
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    And eu adiciono um comentário com o texto "TESTANDO"
    And clico em "Postar comentário"
    Then o último comentário deve ser "TESTANDO"

  Scenario: Adicionar comentário com avaliação por estrelas
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    And eu adiciono um comentário com o texto "TESTANDO"
    And seleciono a estrela 4
    And clico em "Postar comentário"
    Then o último comentário deve ser "TESTANDO"

  Scenario: Deletar o último comentário
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    When Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    Then eu deleto o último comentário
