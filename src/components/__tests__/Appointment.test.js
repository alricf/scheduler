import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("Appointment", () => {
  it("renders without crashing", () => {
    // Render the Appointment component.
    render(<Appointment />);
  });
});