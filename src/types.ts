export type FieldValue = any;
export type MultipleValidationObj = { fieldName: string, value: any, validation: string };
export type Validation = string | Array<MultipleValidationObj>;
export type SingleValidationResult = string | boolean | undefined;
export type MultipleValidationResult = Record<string, SingleValidationResult>;
export type ValidationResult = SingleValidationResult | MultipleValidationResult;
export type ValidateFunction = (validation: Validation, value?: FieldValue) => ValidationResult
export type ValidatorFunction = (value: string, t?: (key: string) => string) => SingleValidationResult
export type Validators = Record<string, ValidatorFunction>;