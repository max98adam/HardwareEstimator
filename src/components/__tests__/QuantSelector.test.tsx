import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantSelector } from "../QuantSelector";
import type { QuantName } from "@/lib/types";

function renderSelector(props?: {
  quant?: QuantName;
  nvfp4Available?: boolean;
}) {
  render(
    <QuantSelector
      quant={props?.quant ?? "q4_k_m"}
      kvQuant="bf16"
      onQuantChange={() => {}}
      onKvQuantChange={() => {}}
      nvfp4Available={props?.nvfp4Available ?? false}
    />,
  );
}

const weightsTrigger = () =>
  screen.getByTestId("weights-quant-trigger");

describe("QuantSelector — NVFP4 is gated per-model", () => {
  it("hides NVFP4 when the model has no NVFP4 build", async () => {
    const user = userEvent.setup();
    renderSelector({ nvfp4Available: false });
    await user.click(weightsTrigger());

    const listbox = await screen.findByRole("listbox");
    // The GPU PTQ families stay visible; only NVFP4 is suppressed.
    expect(within(listbox).getByText(/AWQ 4-bit/)).toBeInTheDocument();
    expect(within(listbox).queryByText(/NVFP4/)).toBeNull();
  });

  it("shows NVFP4 when the model ships an NVFP4 build", async () => {
    const user = userEvent.setup();
    renderSelector({ nvfp4Available: true });
    await user.click(weightsTrigger());

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByText(/NVFP4 \(4-bit\)/)).toBeInTheDocument();
  });
});
