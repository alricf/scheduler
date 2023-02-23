import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

// Test 1.
it("renders without crashing", () => {
  // Render DayListItem component.
  render(<DayListItem />);
});

// Test 2.
it("renders 'no spots remaining' when there are 0 spots", () => {
  // 1. Render DayListItem component.
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);

  // 2. Verify "no spots remaining" text.
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

// Test 3.
it("renders '1 spot remaining' when there is 1 spot", () => {
  // 1. Render DayListItem component.
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);

  // 2. Verify "1 spot remaining" text.
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

// Test 4.
it("renders '2 spots remaining' when there are 2 spots", () => {
  // 1. Render DayListItem component.
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);

  // 2. Verify "2 spots remaining" text.
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});