describe('Test Mainpage with List and Pagination', () => {
	it('Visit website and check for heading', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Pokédex')
	})

	it('Check number of pokemons on first page', () => {
		cy.get('.MuiCard-root', { timeout: 10000 }).should('have.length', 20)
	})

	it('Change to next page and check if it worked', () => {
		cy.get('.MuiPagination-root', { timeout: 10000 })
			.get('li')
			.last()
			.click()
		cy.contains('pikachu', { timeout: 10000 })
	})

	it('Click on card of pikachu and change to its detailpage', () => {
		cy.contains('pikachu', { timeout: 10000 }).click()
		cy.location('pathname').should('eq', '/:pikachu')
	})
})
