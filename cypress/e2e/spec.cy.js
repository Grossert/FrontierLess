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
  it('C1H3: Testar o Login sem colocar um senha', () => {
    cy.get('nav a[href="/login"]').click()
    cy.get('#email').type('teste@teste.com')
    cy.get('button[type="submit"]').click()
  })

  //Testa o cadastro
  it('C2H1: Testar cadastrar novo usuario', () => {
    cy.get('nav a[href="/register"]').click()
    cy.get('#name').type('Teste01')
    cy.get('#email').type('Teste01@gmail.com')
    cy.get('#password').type('teste')
    cy.get('#confirmpassword').type('teste')
    cy.get('#birthdate').type('2000-01-01')
    cy.get('button[type="submit"]').click()
  })
  it('C2H2: TTestar cadastrar novo usuario sem inserir uma confirmação de senha', () => {
    cy.get('nav a[href="/register"]').click()
    cy.get('#name').type('Teste01')
    cy.get('#email').type('Teste01@gmail.com')
    cy.get('#password').type('teste')
    cy.get('#birthdate').type('2000-01-01')
    cy.get('button[type="submit"]').click()
  })
  it('C2H3: Testar cadastrar novo usuario sem inserir um nome', () => {
    cy.get('nav a[href="/register"]').click()
    cy.get('#email').type('Teste01@gmail.com')
    cy.get('#password').type('teste')
    cy.get('#confirmpassword').type('teste')
    cy.get('#birthdate').type('2000-01-01')
    cy.get('button[type="submit"]').click()
  })

  //Testar filtro paises
  it('C3H1: Testar o filtro de paises por destino', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click() 
    cy.get('#searchDestination').type('Alemanha')
  })
  it('C3H2: Testar o filtro de paises por status', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click() 
    cy.get('#status').select('abandonado')

  })
  it('C3H2: Testar o filtro de paises por tipo', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click() 
    cy.get('#exchangeType').select('pesquisa')

  })

  //Testar adicionar projeto
  it('C4H1: Testar adicionar um projeto com todos os campos preenchidos', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
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
  it('C4H2: Testar adicionar projeto sem destino', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
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
  it('C4H3: Testar adicionar projeto sem tipo', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
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
  it('C5H1: Testar adicionar comentario', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click()
  
    cy.wait(5000)
    cy.wait(5000)
    cy.contains('Rússia').should('exist').click()

    cy.get('#comment').type("TESTANDO")
    cy.get('button[type="button"]').contains('Postar comentário').click()

  })
  it('C5H2: Testar adicionar comentario com estrela', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click()
  
    cy.wait(5000)
    cy.contains('Rússia').should('exist').click()
    cy.wait(5000)
    cy.contains('Rússia').should('exist').click()

    cy.get('#comment').type("TESTANDO")
    cy.get('div.cursor-pointer').eq(3).click()
    cy.get('button[type="button"]').contains('Postar comentário').click()

  })
  it('C5H3: Testar deletar comentario', () => {
    cy.get('nav a[href="/login"]').should('have.length', 1).click()
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('a', 'Buscar Projetos').click()
  
    cy.wait(5000)
    cy.contains('Rússia').should('exist').click()
    cy.wait(5000)
    cy.contains('Rússia').should('exist').click()

    cy.get('article').last().find('button').filter(':has(svg.w-4.h-4)').click({ force: true });
    cy.contains('button', 'Remover').should('be.visible').click();

  })
})