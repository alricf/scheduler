import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

// Test 1.
it("renders without crashing", () => {
  // Render Button component.
  render(<Button />);
});

// Test 2.
it("renders its `children` prop as text", () => {
  // 1. Render Default Button component.
  const { getByText } = render(<Button>Default</Button>);

  // 2. Verify Default button text.
  expect(getByText("Default")).toBeInTheDocument();
});

// Test 3.
it("renders a default button style", () => {
  // 1. Render Default Button component.
  const { getByText } = render(<Button>Default</Button>);

  // 2. Verify Default button to have default class.
  expect(getByText("Default")).toHaveClass("button");
});

// Test 4.
it("renders a confirm button", () => {
  // 1. Render Confirm button component.
  const { getByText } = render(<Button confirm>Confirm</Button>);

  // 2. Verify Confirm button to have confirm class.
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

// Test 5.
it("renders a danger button", () => {
  // 1. Render Danger button component.
  const { getByText } = render(<Button danger>Danger</Button>);

  // 2. Verify Danger button to have danger class.
  expect(getByText("Danger")).toHaveClass("button--danger");
});

// Test 6.
it("renders a clickable button", () => {
  // 1. Create mock function.
  const handleClick = jest.fn();

  // 2. Render Clickable Button component.
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  // 3. Select Clickable button.
  const button = getByText("Clickable");

  // 4. Click Clickable button.
  fireEvent.click(button);

  // 5. Verify Clickable button was clicked once.
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test 7.
it("renders a disabled button", () => {
  // 1. Create mock function.  
  const handleClick = jest.fn();

  // 2. Render Disabled Button component.
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  // 3. Select Disabled button.
  const button = getByText("Disabled");

  // 4. Click Disabled button.
  fireEvent.click(button);

  // 5. Verify Disabled button was never clicked.
  expect(handleClick).toHaveBeenCalledTimes(0);
});