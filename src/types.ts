export type ValidatorFunction = (value: string, t?: (key: string) => string) => string | false;
export type Validators = Record<string, ValidatorFunction>;
export type FieldValue = any;
export type Validation = string | [string, FieldValue][];
export type SingleValidationResult = string | boolean | undefined;
export type MultipleValidationResult = Record<string, SingleValidationResult>;
export type ValidationResult = SingleValidationResult | MultipleValidationResult;
export type ValidateFunction = (validation: Validation, value?: FieldValue) => ValidationResult 