describe('navigation',()=>{
    beforeEach(() => {
        cy.visit(Cypress.env('host'))
    })
    it('shows mobile navigation when small screen', ()=>{
        cy.viewport('iphone-8')
        cy.get('header-drawer').should('be.visible')
    })
    it('can be clicked small screen', ()=>{
        cy.viewport('iphone-8')
        cy.get('header-drawer').should('be.visible').click()
        cy.get('header-drawer').find('details').find('summary').should('have.attr', 'aria-expanded', 'true')
        cy.get('header-drawer').find('details').should('be.visible').should('contain', 'Log in')
    })
    it('can be closed on small screen', ()=>{
        cy.viewport('iphone-8')
        cy.get('header-drawer').should('be.visible').click()
        cy.get('header-drawer').get('details').should('be.visible').should('contain', 'Log in')
        cy.get('header-drawer').should('be.visible').click()
        cy.get('header-drawer').find('details').find('summary').should('have.attr', 'aria-expanded', 'false')

    })
    it('shows mobile navigation when small screen', ()=>{
        cy.viewport('macbook-16')
        cy.get('header-drawer').should('not.be.visible')
    })
})
describe('footer navigation',()=>{
    beforeEach(() => {
        cy.visit(Cypress.env('host'))
        cy.viewport('iphone-8')
    })
    it('shows mobile navigation when small screen', ()=>{
        cy.get('.accordion').should('be.visible')
    })
    it('opens when clicked', ()=>{
        cy.get('.footer').find('details').first().find('h2').first().click().wait(1000)
        cy.get('.footer').find('details').first().find('ul').should('contain','Blog').should('be.visible')
    })
    it('closes when clicked', ()=>{
        cy.get('.footer').find('details').first().find('h2').first().click().wait(1000)
        cy.get('.footer').find('details').first().find('ul').should('contain','Blog').should('be.visible')
        cy.get('.footer').find('details').first().find('h2').first().click().wait(1000)
        cy.get('.footer').find('details').first().find('ul').should('contain','Blog').should('not.be.visible')
        // cy.get('footer').get('.accordion').first().click().should('not.contain','Blog')
    })
    it('does not show when on lg screen', ()=>{
        cy.viewport('macbook-16')
        cy.get('.accordion').should('not.be.visible')
    })
})