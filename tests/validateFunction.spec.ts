import {
  createVuePatternValidatorPlugin,
  Validators,
  ValidateFunction,
} from "../src";
import { createApp } from "vue";

describe("Validate Function", () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    const customValidators: Validators = {
      required: (value) => value && value.length > 1 ? true : "Field is required",
      numeric: (val) => typeof val === "number" || "Value should be a number",
    };
    const app = createApp({});
    app.use(createVuePatternValidatorPlugin(customValidators));
    validate = app._context.provides.validate as ValidateFunction;
  });

  it("should validate single field", () => {
    expect(validate("required", "")).toBe("Field is required");
    expect(validate("numeric", "hehe")).toBe("Value should be a number");
    expect(validate("numeric", 123)).toBe(undefined);
  });

  it("failure: should validate multiple fields", () => {
    const results = validate([
      {
        fieldName: "firstName",
        value: "",
        validation: "required",
      },
      {
        fieldName: "phoneNumber",
        value: "abc",
        validation: "numeric",
      },
    ]);
    expect(results).toEqual({
      firstName: "Field is required",
      phoneNumber: "Value should be a number",
    });
  });

  it("success: it should pass validate multiple fields", () => {
    const results = validate([
      {
        fieldName: "firstName",
        value: "John",
        validation: "required",
      },
      {
        fieldName: "phoneNumber",
        value: 123,
        validation: "numeric",
      },
    ]);
    expect(results).toEqual({});
  });
});

describe('$ve Function', () => {
  let $ve: any;
  beforeAll(() => {
    const customValidators: Validators = {
      required: (value) => value && value.length > 1 ? true : "Field is required",
      numeric: (val) => typeof val === "number" || "Value should be a number",
    };
    const app = createApp({});
    app.use(createVuePatternValidatorPlugin(customValidators));
    $ve = app.config.globalProperties.$ve;
  });
  it('success: should return error message if validation fails', () => {
    const result = $ve('required', '');
    expect(result).toEqual('Field is required');
  });
  it('failure: should return undefined if validation passes', () => {
    const result = $ve('required', 'john');
    expect(result).toBeUndefined();
  })
});
