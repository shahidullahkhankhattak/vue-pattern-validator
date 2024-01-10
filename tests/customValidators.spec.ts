import { Validators } from "../src";

describe("Custom Validators", () => {
  const customValidators: Validators = {
    required: (value) => (!value ? "Field is required" : false),
    email: (value) =>
      !/^[^@]+@[^@]+\.[^@]+$/.test(value) ? "Invalid email" : false,
  };

  it("should validate required field", () => {
    expect(customValidators.required("")).toBe("Field is required");
    expect(customValidators.required("test")).toBe(false);
  });

  it("should validate email field", () => {
    expect(customValidators.email("user@test.com")).toBe(false);
    expect(customValidators.email("invalid-email")).toBe("Invalid email");
  });
});
