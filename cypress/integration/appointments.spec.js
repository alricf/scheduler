describe("Appointments", () => {
  // Common test commands function.
  beforeEach(() => {
    // Reset api/db.
    cy.request("GET", "/api/debug/reset");

    // Load root page.
    cy.visit("/");

    // DOM confirmation.
    cy.contains("Monday");
  });

  // Test 1
  it("should book an interview", () => {
    // Click empty appointment add button.
    cy.get("[alt=Add]")
      .first()
      .click();

    // Type name into student name input field in the form.
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Choose interviewer in the form.
    cy.get('[alt="Sylvia Palmer"]').click();

    // Click save button in the form.
    cy.contains("Save").click();

    // Verify that new interview has been booked.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  // Test 2
  it("should edit an interview", () => {
    // Click edit button in booked interview.
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // Edit student name in the form.
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    // Edit interviewer in the form.
    cy.get("[alt='Tori Malcolm']").click();

    // Click save button in the form.
    cy.contains("Save").click();

    // Verify if edited interview has been booked.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // Test 3
  it("should cancel an interview", () => {
    // Click delete on booked interview.
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    // Click confirm.
    cy.contains("Confirm").click();
  
    // Check if "Deleting" status appears.
    cy.contains("Deleting").should("exist");

    // Check if "Deleting" status disappears.
    cy.contains("Deleting").should("not.exist");
  
    // Verify original booked interview has been deleted.
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});