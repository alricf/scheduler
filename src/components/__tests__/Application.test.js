import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    // 1. Render the Application.
    const { getByText } = render(<Application />);

    // 2. Wait for Element with "Monday".
    return waitForElement(() => getByText("Monday")).then(() => {

      // 3. Click "Tuesday" button.
      fireEvent.click(getByText("Tuesday"));

      // 4. Verify expected "Leopold Silvers" text.
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait for element with "Archie Cohen".
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Select empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 4. Click empty appointment button.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Input student name value to "Lydia Miller-Jones" in the form.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 6. Select interviewer as "Sylvia Palmer" in the form.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 7. Click save button in the form.
    fireEvent.click(getByText(appointment, "Save"));

    // 8. Verify "Saving" status appears.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 9. Wait for new booked interview to appear.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 10. Select "Monday" from side-bar.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 11. Verify the spots for Monday has been reduced by 1.
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the form value to edit the student name.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click a different interviewer to edit the interviewer.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the save button on the form.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", async () => {

    // 1. Reject axios put mock.
    axios.put.mockRejectedValueOnce();

    // 2. Render the Application.
    const { container } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Finds an empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 5. Click Add on empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 6. Add a value for student name in form.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 7. Click an interviewer in form.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 8. Click Save button in form.
    fireEvent.click(getByText(appointment, "Save"));

    // 9. Expect the "Saving" text to be in the document.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 10. Wait for element with "Error" text.
    await waitForElement(() => getByText(appointment, "Error"));

    // 11. Click close image.
    fireEvent.click(queryByAltText(appointment, "Close"));

    // 12. Expect element with "Add" alt text on empty appointment.
    expect(getByAltText(appointment, "Add"));
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    // 1. Rejects axios delete mock.
    axios.delete.mockRejectedValueOnce();

    // 2. Render the Application.
    const { container } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Finds a booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 5. Click delete image on booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 6. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    // 7. Click the "Confirm" button.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 8. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 9. Wait for element with "Error" text.
    await waitForElement(() => getByText(appointment, "Error"));

    // 10. Click close image.
    fireEvent.click(queryByAltText(appointment, "Close"));

    // 11. Expect the original appointment.
    expect(getByText(appointment, "Archie Cohen"));
  });
});