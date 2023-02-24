import React from "react";

import { render, cleanup, fireEvent, getByText } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  // Test 1
  it("renders without student name if not provided", () => {
    // 1. Render component with props.
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );

    // 2. Validation: no student name is provided in form.
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  // Test 2
  it("renders with initial student name", () => {
    // 1. Render component with props.
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
      />
    );

    // 2. Validation: form input with initial student name.
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // Test 3
  it("validates that the student name is not blank", () => {
    // 1. Create the mock onSave function.
    const onSave = jest.fn();
  
    // 2. Render the component with props.
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    // 3. Click the save button.
    fireEvent.click(getByText("Save"));
  
    // 4. Validation
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  // Test 4
  it("validates that the interviewer cannot be null", () => {
    // 1. Create the mock onSave function.
    const onSave = jest.fn();
  
    // 2. Render the component with props.
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    );
  
    // 3. Click the save button.
    fireEvent.click(getByText("Save"));
  
    // 4. Validation: the interviewer is undefined and onSave function not been called.
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  // Test 5
  it("can successfully save after trying to submit an empty student name", () => {
    // 1. Create the mock onSave function.
    const onSave = jest.fn();

    // 2. Render component with props.
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    // 3. Click save button.
    fireEvent.click(getByText("Save"));
  
    // 4. Validate that student name is blank and onSave mock function has not been called.
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    // 5. Input student name in form.
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    // 6. Click save button.
    fireEvent.click(getByText("Save"));
  
    // 7. Validation: student name is not null. onSave mock function called once and student name is "Lydia Miller-Jones" and interviewer id is 1.
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  // Test 6
  it("calls onCancel and resets the input field", () => {
    // 1. Create onCanel mock function.
    const onCancel = jest.fn();

    // 2. Render component with props.
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    // 3. Click save button.
    fireEvent.click(getByText("Save"));
  
    // 4. Input student name in form.
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    // 5. Click cancel button.
    fireEvent.click(getByText("Cancel"));
  
    // 6. Validation: reset input field and check that onCancel mock function is called once.
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});