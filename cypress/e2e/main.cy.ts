const byId = (id: string) => `[data-testid="${id}"]`
describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="item"]').as('items')
  })

  it('displays 20 items by default and 40 after scroll', () => {
    cy.get('@items').should('have.length', 20)
    cy.scrollTo(0, 2000)
    cy.wait(1000)
    cy.get('@items').should('have.length', 40)
    cy.get('@items').first().should('have.class', 'relative flex-col overflow-hidden rounded-2xl shadow')
  })

  it('displays items depending on categoryId', {scrollBehavior: false}, () => {
    cy.get('[aria-label="sell"]').first().click({force: true})
    cy.wait(1000)
    cy.get('@items').should('have.attr', 'data-category', 1)
    cy.get('select').select(2)
    cy.get('@items').should('have.attr', 'data-category', 5)
  })

  it('login', () => {
    cy.get('[data-testid="user"]').first().click()
    cy.get('[data-testid="development-login-button"]').first().click()
    cy.wait(1000)
    cy.get('button').last().should('have.attr', 'data-testid', 'logout')
    cy.get('[data-testid="logout"]').first().click()
  })

  it('should add to favourites', {scrollBehavior: false}, () => {
    cy.get('[aria-label="add to favorites"]').eq(0).click()
    cy.get('[aria-label="add to favorites"]').eq(1).click()
    cy.visit('http://localhost:3000/favourites')
    cy.get('@items').should('have.length.greaterThan', 1)
    cy.wait(1000)
    cy.get('[aria-label="add to favorites"]').each(async (btn, index) => {
      btn.click();
    })
    cy.get('@items').should('have.length', 0)
  })

  it('create post', {scrollBehavior: false}, () => {
    cy.get('[data-testid="user"]').first().click()
    cy.get('[data-testid="development-login-button"]').first().click()
    cy.wait(1000)
    cy.get('a[href*="/add"]').last().click({force: true})
    cy.get(byId('categoryId')).select(2)
    cy.get(byId('price')).clear().type('1000')
    cy.get(byId('title')).clear().type('Apartment')
    cy.get(byId('description')).clear().type('Description of the apartment')
    cy.get('form').submit()
    cy.get(byId('post-form-images')).first().children().should('have.length', 0)
  })

  it('has blog', () => {
    cy.visit('http://localhost:3000/blog')
    cy.get('main > ul > li')
      .its('length')
      .should('eq', 4)
  })

  it('check post', () => {
    cy.get('@items').first().click()
    cy.get('h1').should('exist')
    cy.get('pre').should('exist')
  })
})

export {}
