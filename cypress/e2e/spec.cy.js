describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
  })

  //Testa o login
  it('C1H1: Testar o Login', () => {
    cy.get('nav a[href="/login"]').click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()
  })
  it('C1H2: Testar o Login sem colocar um email', () => {
    cy.get('nav a[href="/login"]').click()
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()
  })

  //Testa o cadastro
  it('C2H1: Testar o Cadastro', () => {
    cy.get('nav a[href="/register"]').click()
    cy.get('#name').type('Teste01')
    cy.get('#email').type('Teste01@gmail.com')
    cy.get('#password').type('teste')
    cy.get('#confirmpassword').type('teste')
    cy.get('#birthdate').type('2000-01-01')
    cy.get('button[type="submit"]').click()
  })
  it('C2H2: Testar o Cadastro sem inserir uma confirmação de senha', () => {
    cy.get('nav a[href="/register"]').click()
    cy.get('#name').type('Teste01')
    cy.get('#email').type('Teste01@gmail.com')
    cy.get('#password').type('teste')
    cy.get('#birthdate').type('2000-01-01')
    cy.get('button[type="submit"]').click()
  })

  //Testar filtro paises
  it('C3H1: Testar o filtro de paises', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click() 
    cy.get('#searchDestination').type('Alemanha')
  })
  it('C3H2: Testar o filtro de paises status e tipo de intercambio', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click() 
    cy.get('#searchDestination').type('Alemanha')
    cy.get('#status').select('progredindo')
    cy.get('#exchangeType').select('pesquisa')

  })

  it('Cenário 01 - Sucesso ao adicionar um projeto', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Login').click() 
    cy.get('input[id="email"]').type("cypress@email.com")
    cy.get('input[id="password"]').type("Senha-Segura-Cypress")
    cy.get('button[type="submit"]').click()
    
    cy.wait(5000)
    cy.get('button[title="Cria Projeto"]').click()
    cy.wait(5000)

    //Clica na ultima opção do dropdown
    cy.get('div.flex.justify-between.p-4.w-full.h-full').last().click()

    cy.get('input[id="destination"]').type("Alemanha")
    cy.get('select[id="exchangeType"]').select('Idioma')
    cy.get('select[id="status"]').select('Progredindo')

    cy.contains('Salvar').click() 
    cy.contains('Sim, tenho certeza').click() 
  })
  it('Hipotese 01 - Sem destino', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Login').click() 
    cy.get('input[id="email"]').type("cypress@email.com")
    cy.get('input[id="password"]').type("Senha-Segura-Cypress")
    cy.get('button[type="submit"]').click()
    
    cy.wait(5000)
    cy.get('button[title="Cria Projeto"]').click()
    cy.wait(5000)

    //Clica na ultima opção do dropdown
    cy.get('div.flex.justify-between.p-4.w-full.h-full').last().click()

    cy.get('select[id="exchangeType"]').select('Idioma')
    cy.get('select[id="status"]').select('Progredindo')

    cy.contains('Salvar').click() 
    cy.contains('Sim, tenho certeza').click()
    
    //aparece um alert de erro com a mensagem "Favor insira um destino e um tipo de intercâmbio"
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Favor insira um destino e um tipo de intercâmbio')
    })
  })
  it('Hipotese 02 - Sem tipo', () => {
    cy.visit('http://localhost:3001/')
    cy.contains('Login').click() 
    cy.get('input[id="email"]').type("cypress@email.com")
    cy.get('input[id="password"]').type("Senha-Segura-Cypress")
    cy.get('button[type="submit"]').click()
    
    cy.wait(5000)
    cy.get('button[title="Cria Projeto"]').click()
    cy.wait(5000)

    //Clica na ultima opção do dropdown
    cy.get('div.flex.justify-between.p-4.w-full.h-full').last().click()

    cy.get('input[id="destination"]').type("França")
    //cy.get('select[id="exchangeType"]').select('Idioma')
    cy.get('select[id="status"]').select('Progredindo')

    cy.contains('Salvar').click() 
    cy.contains('Sim, tenho certeza').click() 

    //aparece um alert de erro com a mensagem "Favor insira um destino e um tipo de intercâmbio"
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Favor insira um destino e um tipo de intercâmbio')
    })
  })

  //Testar Comentarios
it.only('C3H1: Testar o filtro de países', () => {
  cy.get('nav a[href="/login"]').should('have.length', 1).click()
  cy.get('#email').type('teste@teste.com')
  cy.get('#password').type('teste')
  cy.get('button[type="submit"]').click()

  cy.contains('a', 'Buscar Projetos').click()

  cy.get('div.animate-spin').should('not.exist')
  cy.contains('Rússia', { timeout: 20000 }).should('exist').click()

  //cy.contains('Rússia', { timeout: 20000 }).should('be.visible').click()


})

})