import React from "react";
import { render } from "@testing-library/react";
import { Form } from "react-final-form";
import { AncienneteCE } from "../AncienneteCE.js";

describe("<AncienneteCE />", () => {
  it("renders", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        {({ form }) => <AncienneteCE form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
