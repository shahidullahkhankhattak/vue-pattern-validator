import { Validators } from "../src";

describe("Custom Validators", () => {
  const customValidators: Validators = {
    required: (val) => (val && val.length > 0 ? true :  "Field is required"),
    email: (value) =>
      !/^[^@]+@[^@]+\.[^@]+$/.test(value) ? "Invalid email" : true,
  };

  it("should validate required field", () => {
    expect(customValidators.required("")).toBe("Field is required");
    expect(customValidators.required("test")).toBe(true);
  });

  it("should validate email field", () => {
    expect(customValidators.email("user@test.com")).toBe(true);
    expect(customValidators.email("invalid-email")).toBe("Invalid email");
  });
});
