describe("Navigation", () => {
  it("should visit root", () => {
    // Loads page
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // Loads page.
    cy.visit("/");
    
    // Clicks Tuesday and verifies that it is selected.
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});