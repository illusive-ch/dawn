// ipad-2	768	1024
// ipad-mini	768	1024
// iphone-3	320	480
// iphone-4	320	480
// iphone-5	320	568
// iphone-6	375	667
// iphone-6+	414	736
// iphone-7	375	667
// iphone-8	375	667
// iphone-x	375	812
// iphone-xr	414	896
// iphone-se2	375	667
// macbook-11	1366	768
// macbook-13	1280	800
// macbook-15	1440	900
// macbook-16	1536	960
// samsung-note9	414	846
// samsung-s10	360	760


describe('home page', () => {
    it('loads the home page', function () {
        cy.visit(Cypress.env('host'))
        // should see a button
        cy.get('.banner__image__text').should(($button) => {
            expect($button).to.have.length(1)
        })
    })
})
describe('hero image', () => {
    it('Shows 3 on xl screen', () =>{
        cy.viewport('macbook-16')
        cy.get('.banner__media-third').filter(':visible').should('be.visible').should(($hero) =>{
            expect($hero).to.have.length(3)
        })
    })
    it('Shows 2 on lg screen', () =>{
        cy.viewport('ipad-2')
        cy.get('.banner__media-third').filter(':visible').should('be.visible').should(($hero) =>{
            expect($hero).to.have.length(2)
        })
    })
    it('Shows 1 on sm screen', () =>{
        cy.viewport('iphone-8')
        cy.get('.banner__media-third').filter(':visible').should('be.visible').should(($hero) =>{
            expect($hero).to.have.length(1)
        })
    })
})