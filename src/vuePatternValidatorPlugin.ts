// vuePatternValidatorPlugin.ts
import { App } from "vue";
import { Validators, ValidatorFunction, Validation, FieldValue, SingleValidationResult, ValidationResult, MultipleValidationResult } from "./types";

export default function createVuePatternValidatorPlugin(
  customValidators: Validators
) {
  return {
    install(app: App) {
      const $v = (...args: string[]) => {
        return args.map((name) => (value: string) => {
          const validator = customValidators[name];
          const t = app.config.globalProperties.$t;
          return validator ? validator(value, t) : false;
        });
      };

      app.config.globalProperties.$v = $v;

      app.provide(
        "validate",
        (validation: Validation, value?: FieldValue): ValidationResult => {
          const t = app.config.globalProperties.$t;

          if (typeof validation === "string" && value !== undefined) {
            const validator: ValidatorFunction = customValidators[validation];
            return validator ? validator(value, t) : false;
          } else if (Array.isArray(validation)) {
            const results: MultipleValidationResult = {};
            validation.forEach(([name, val]) => {
              const validator: ValidatorFunction = customValidators[name];
              const validationResult = validator ? validator(val, t) : false;
              results[name] =
                validationResult === false ? undefined : validationResult;
            });
            return results;
          }
        }
      );
    },
  };
}
