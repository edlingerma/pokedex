describe('Check if the store is working properly', () => {

    it('Change from Page 2 to Detailpage and back to page 2', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.MuiPagination-root', { timeout: 10000 }).get('li', { timeout: 10000 }).should('have.length', 9)
        cy.get('.MuiPagination-root', { timeout: 10000 }).get('li').last().click()
        cy.get('.Mui-selected', { timeout: 10000 }).contains('2')
        cy.contains('pikachu').click()
        cy.location('pathname', { timeout: 10000 }).should('eq', '/:pikachu')
        cy.go('back')
        cy.get('.MuiPagination-root', { timeout: 10000 }).get('li', { timeout: 10000 }).should('have.length', 9)
        cy.get('.Mui-selected', { timeout: 10000 }).contains('2')
    })

})