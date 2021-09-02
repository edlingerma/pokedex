describe('Test Detailspage with Accordions and Information', () => {

    it('Visit detailpage and check for all info headings', () => {
      cy.visit('http://localhost:3000/:pikachu')
      cy.contains('Name')
      cy.contains('Number')
      cy.contains('Type(s)')
      cy.contains('stats')
      cy.contains('abilities')
      cy.contains('evolution')
      cy.contains('moves')
    })

    it('Check if Accordion open and close works', () => {
        cy.get('.MuiIconButton-root', { timeout: 10000 }).first().click()
        cy.contains('attack')
        cy.contains('55')
        cy.get('.MuiIconButton-root', { timeout: 10000 }).first().click()
        cy.contains('attack').should('not.be.visible')
        cy.contains('55').should('not.be.visible')
    })

    it('Check if evolution is correct', () => {
        cy.get('.MuiIconButton-root', { timeout: 10000 }).eq(2).click()
        cy.get('.MuiCard-root', { timeout: 10000 }).should('have.length', 3)
        cy.get('.MuiCard-root').eq(0).contains('pichu')
        cy.get('.MuiCard-root').eq(1).contains('pikachu')
        cy.get('.MuiCard-root').eq(2).contains('raichu')
    })

    it('Click on card of raichu in evolution and change to its detailpage', () => {
        cy.get('.MuiCard-root', { timeout: 10000 }).eq(2).contains('raichu').click()
        cy.location('pathname', { timeout: 10000 }).should('eq', '/:raichu')
    })
  
  })
  