import { App } from "vue";
import { Validators, ValidatorFunction, Validation, FieldValue, ValidationResult, MultipleValidationResult } from "./types";

export default function createVuePatternValidatorPlugin(
  customValidators: Validators
) {
  const validationFnNotFoundError = (validatorName: string) => new Error(`vue-form-validator: validator function ${validatorName} not found`)
  return {
    install(app: App) {
      const t = app.config.globalProperties.$t;

      const $ve = (validation: string, value: any) => {
        const validator = customValidators[validation];
        if (!validator) {
          throw validationFnNotFoundError(validation)
        }
        const result = validator(value, t);
        if (result === true) return undefined 
        return result;
      };

      app.config.globalProperties.$ve = $ve;

      app.provide(
        "validate",
        (validation: Validation, value?: FieldValue): ValidationResult => {
          if (typeof validation === "string" && value !== undefined) {
            const validator: ValidatorFunction = customValidators[validation];
            if (!validator) {
              throw validationFnNotFoundError(validation)
            }
            const result = validator(value, app.config.globalProperties.$t);
            if (result === true) return undefined;
            return result;
          } else if (Array.isArray(validation)) {
            const results: MultipleValidationResult = {};
            validation.forEach(({ fieldName, validation, value }) => {
              const validator: ValidatorFunction = customValidators[validation];
              if (!validator) {
                throw validationFnNotFoundError(validation)
              }
              const validationResult = validator(value, t);
              if (validationResult !== true) {
                results[fieldName] = validationResult;
              }
            });
            return results;
          }
        }
      );
    },
  };
}
