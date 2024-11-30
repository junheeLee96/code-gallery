import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

test("", async () => {
  render(await Home());
  expect(screen.getByText("Get")).toBeInTheDocument();
});
