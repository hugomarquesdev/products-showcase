describe("All pages", () => {
  it("'home' page works", () => {
    cy.visit("http://localhost:8000/")
    cy.contains("Somos fábrica")
  })
})
