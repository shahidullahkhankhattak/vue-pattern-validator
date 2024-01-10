import { createVuePatternValidatorPlugin, Validators, ValidateFunction } from '../src';
import { createApp } from 'vue';

describe('Validate Function', () => {
  let validate: ValidateFunction;

  beforeAll(() => {
    const customValidators: Validators = {
      required: (value) => (!value ? 'Field is required' : false),
      numeric: (val) => typeof val !== "number" && 'Value should be a number'
    };
    const app = createApp({});
    app.use(createVuePatternValidatorPlugin(customValidators));
    validate = app._context.provides.validate as ValidateFunction;
  });

  it('should validate single field', () => {
    expect(validate('required', '')).toBe('Field is required');
    expect(validate('numeric', 'hehe')).toBe('Value should be a number');
    expect(validate('numeric', 123)).toBe(false)
  });

  it('failure: should validate multiple fields', () => {
    const results = validate([
      ['required', ''],
      ['numeric', 'abc']
    ]);
    expect(results).toEqual({
      required: 'Field is required',
      numeric: 'Value should be a number'
    });
  });

  it('success: it should pass validate multiple fields', () => {
    const results = validate([
      ['required', 'asdf'],
      ['numeric', 123]
    ]);
    expect(results).toEqual({});
  });
});