Feature: Gerenciamento de Comentários em Projetos

  Scenario: Adicionar comentário simples
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    When eu adiciono um comentário com o texto "TESTANDO"
    And clico em "Postar comentário"
    Then o comentário "TESTANDO" deve estar visível na lista de comentários

  Scenario: Adicionar comentário com avaliação por estrelas
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    When eu adiciono um comentário com o texto "TESTANDO"
    And seleciono a estrela 4
    Then o último comentário deve ser TESTANDO com 4 estrelas

  Scenario: Deletar o último comentário
    Given Eu estou logado como "teste@teste.com" com a senha "teste"
    And Eu clico no link "Buscar Projetos"
    And clico no projeto "Rússia"
    Then eu deleto o último comentário
