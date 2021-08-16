describe('cart', () => {
    it('adds item to the cart', function () {
        cy.visit(Cypress.env('host') + '/products/4-step-sytem')
        // should see a button
        cy.get('#cart-notification').should('not.be.visible')
        cy.get('product-form').find('form').submit().wait(3000)
        cy.get('#cart-notification').should('be.visible')
        cy.get('#cart-notification').should('contain','Item added to your cart').should('be.visible')
    })
    it.only('allows you to check out after adding item to the cart', function () {
        cy.visit(Cypress.env('host') + '/products/4-step-sytem')
        cy.get('product-form').find('form').submit().wait(3000)
        cy.visit(Cypress.env('host') + '/cart')
        cy.get('.cart__items').find('.cart-item__name').should('contain','4 step system')
        // cy.get('#cart').first().submit().wait(3000)
        // cy.url().should('contain','checkouts')
    })
})