import React from "react";
import InlineEdit from "./InlineEdit";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders the value as text and not an input", () => {
  const { getByTestId, queryByTestId } = render(
    <InlineEdit value={"Untitled Document"} onEnter={() => {}} />
  );

  // expect(getByTestId("inline-edit-text").textContent).toBe("Untitled Document");
  expect(getByTestId("inline-edit-text")).toHaveTextContent(
    "Untitled Document"
  );
  expect(queryByTestId("inline-edit-input")).toBeFalsy();
});

it("changes from text to an input when the text is clicked", () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <InlineEdit value={"Untitled Document"} onEnter={() => {}} />
  );

  // Click on text
  fireEvent.click(getByText("Untitled Document"));

  // expect(getByTestId("inline-edit-input").value).toBe("Untitled Document");
  expect(getByTestId("inline-edit-input")).toHaveValue("Untitled Document");
  expect(queryByTestId("inline-edit-text")).toBeFalsy();
});

it("calls onEnter with the new value when enter is pressed", () => {
  const onEnterHandler = jest.fn();
  const { getByTestId, getByText } = render(
    <InlineEdit value={"Untitled Document"} onEnter={onEnterHandler} />
  );

  fireEvent.click(getByText("Untitled Document"));

  const input = getByTestId("inline-edit-input");

  fireEvent.change(input, {
    target: {
      value: "USC"
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });

  expect(onEnterHandler).toHaveBeenCalledWith("USC");
});

it("renders text when the escape key is pressed", () => {
  const { getByTestId, getByText, queryByTestId } = render(
    <InlineEdit value={"Untitled Document"} onEnter={() => {}} />
  );

  fireEvent.click(getByText("Untitled Document"));

  const input = getByTestId("inline-edit-input");

  fireEvent.change(input, {
    target: {
      value: "USC"
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 27
  });

  expect(getByTestId("inline-edit-text").textContent).toBe("Untitled Document");
  expect(queryByTestId("inline-edit-input")).toBeFalsy();
});
