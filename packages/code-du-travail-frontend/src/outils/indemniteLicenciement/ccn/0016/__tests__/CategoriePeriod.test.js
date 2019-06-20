import React from "react";
import { render } from "react-testing-library";
import { CategoriePeriod } from "../CategoriePeriod";
import { Form } from "react-final-form";

describe("<CategoryPeriod />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <CategoriePeriod />} />
    );
    expect(container).toMatchSnapshot();
  });
});
