describe("Navigation", () => {
  it("should visit root", () => {
    // Loads page
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // Loads page
    cy.visit("/");

    // Clicks element and performs assertion
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});