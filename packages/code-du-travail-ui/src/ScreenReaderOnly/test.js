import React from "react";
import { render } from "react-testing-library";
import ScreenReaderOnly from ".";

describe("<ScreenReaderOnly />", () => {
  test("should render", () => {
    const { container } = render(<ScreenReaderOnly>SR Only</ScreenReaderOnly>);
    expect(container).toMatchSnapshot();
  });
});