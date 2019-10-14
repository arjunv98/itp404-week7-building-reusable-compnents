import React from "react";
import RemainingCharacters from "./RemainingCharacters";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders the remaining number of characters", () => {
  const { container } = render(<RemainingCharacters max={10} text={"USC"} />);

  // expect(container.textContent).toBe("7 characters left");
  expect(container).toHaveTextContent(/^7 characters left$/);
});

it("renders the children prop", () => {
  const { container } = render(
    <RemainingCharacters max={10} text={"USC"}>
      {remainingCharacters => {
        return <p>{remainingCharacters}</p>;
      }}
    </RemainingCharacters>
  );

  // expect(container.textContent).toBe("7");
  expect(container).toHaveTextContent("7");
});
