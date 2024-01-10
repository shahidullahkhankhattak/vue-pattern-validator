# Vue Pattern Validator

## Overview

Vue Pattern Validator is a versatile validation library for Vue 3 applications. It provides an easy way to validate form fields, supporting both single and multiple field validations. This library also supports integration with i18n for localized error messages.

## Installation

Install Vue Pattern Validator using npm or yarn:

```bash
npm install vue-pattern-validator
# or
yarn add vue-pattern-validator
```

## Usage

### Setup

First, import and use the Vue Pattern Validator plugin in your main Vue file. Define your custom validators and pass them to the plugin.

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuePatternValidatorPlugin, Validators } from 'vue-pattern-validator';

// Define custom validators
const customValidators: Validators = {
  required: (val, t) => !val && (t ? t('field.required') : 'This field is required'),
  // ... other validators
};

const app = createApp(App);
app.use(createVuePatternValidatorPlugin(customValidators));
app.mount('#app');
```

### Single Field Validation

To validate a single field, use the `validate` function provided by the library. It returns an error message if validation fails, or `false` if validation passes.

```typescript
import { inject } from 'vue';
import { ValidateFunction, ValidationResult } from 'vue-pattern-validator';

export default {
  setup() {
    const validate = inject<ValidateFunction>('validate');
    const errorMessage: ValidationResult = validate('required', 'testValue');
    // errorMessage will be 'This field is required' if testValue is empty, or false if not
  }
};
```

### Multiple Fields Validation

To validate multiple fields at once, pass an array of tuples to the `validate` function. Each tuple should contain the validator name and the field value. The function returns an object with the validation results.

```typescript
import { inject } from 'vue';
import { ValidateFunction, ValidationResult } from 'vue-pattern-validator';

export default {
  setup() {
    const validate = inject<ValidateFunction>('validate');
    const validationResults: ValidationResult = validate([
      ['required', 'firstValue'],
      ['email', 'secondValue']
    ]);
    // validationResults will be an object like:
    // {
    //   required: 'This field is required' or undefined,
    //   email: 'Invalid email address' or undefined
    // }
  }
};
```

### i18n Integration

If your application uses Vue i18n, Vue Pattern Validator can utilize it to return localized error messages. Ensure i18n is set up in your Vue application before initializing the validator plugin.

## Custom Validators

You can create custom validators as per your application's requirements. Each validator is a function that takes the field value and an optional translation function `t`. It should return a string with an error message when validation fails, or `false` if validation passes.

```typescript
import { Validators } from 'vue-pattern-validator';

const customValidators: Validators = {
  customRule: (val, t) => {
    if (val does not meet some condition) {
      return t ? t('custom.error.message') : 'Default error message';
    }
    return false;
  }
};
```

## License

Vue Pattern Validator is [ISC licensed](https://opensource.org/licenses/ISC). 

Contribute to the library or report issues on the [GitHub repository](https://github.com/shahidullahkhankhattak/vue-pattern-validator).
