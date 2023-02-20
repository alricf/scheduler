describe("Navigation", () => {
  it("should visit root", () => {
    // Loads page
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});