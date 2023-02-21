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

    // Verify that new appointment has been booked.
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
  
    // Verify if edited appointment has been booked.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // Test 3
  it("should cancel an interview", () => {
    
  })
});