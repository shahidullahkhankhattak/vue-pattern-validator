# Vue Pattern Validator
![Build Status](https://github.com/shahidullahkhankhattak/vue-pattern-validator/actions/workflows/build.yml/badge.svg?branch=main)
![Tests Status](https://github.com/shahidullahkhankhattak/vue-pattern-validator/actions/workflows/test.yml/badge.svg?branch=main&event=push)

A Vue3 validator library to easily validate fields & handle validators in a sophisticated manner

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
  required: (val, t) => (val && val.length > 0) || (t ? t('field.required') : 'This field is required'),
  // ... other validators
};

const app = createApp(App);
app.use(createVuePatternValidatorPlugin(customValidators));
app.mount('#app');
```

### Single Field Validation

To validate a single field, use the `validate` function provided by the library. It returns an error message if validation fails, or `undefined` if validation passes.

#### Params
- **validation**: first parameter is the name of the validation - `string`
- **value**: second parameter is the value of the field - `any`

```typescript
import { inject } from 'vue';
import { ValidateFunction, ValidationResult } from 'vue-pattern-validator';

export default {
  setup() {
    const validate = inject<ValidateFunction>('validate');
    const errorMessage: ValidationResult = validate('required', 'testValue');
    // errorMessage will be 'This field is required' if testValue is empty, or undefined if validation passes
  }
};
```

### Multiple Fields Validation

To validate multiple fields at once, pass an array of tuples to the `validate` function. Each tuple should contain the validator name and the field value. The function returns an object with the validation results.

#### Params
- **validationsArray**: first parameter is the validations array `Array<MultipleValidationObj>`
#### MultipleValidationObj structure
- **fieldName**: name of the field - `string`
- **validation**: name of the validation - `string`
- **value**: value of the field - `any`

```typescript
import { inject } from 'vue';
import { ValidateFunction, MultipleValidationResult } from 'vue-pattern-validator';

export default {
  setup() {
    const validate = inject<ValidateFunction>('validate');
    const validationResults: MultipleValidationResult = validate([{
      fieldName: 'firstName',
      validation: 'required',
      value: 'john'
    }, {
      fieldName: 'lastName',
      validation: 'required',
      value: ''
    }]);
    /**
     * validationResults will only contain fields for which validation did not pass, it will be an object like:
     * { 
     *   lastName: 'This field is required'
     * }
     * This object doesn't contain firstName because for that field the validation passed
     */
  }
};
```


### Using `$ve` aka validation error for Validations in Vue Templates

The Vue Pattern Validator library exposes a `$ve` function that is globally available in Vue templates. This function is particularly useful for form validations, where you can get `error message` for a specific field value & validation, if the validation passes it will return `undefined` (so nothing will be rendered on the screen).

#### Params
- **validation**: first parameter is the name of the validation - `string`
- **value**: second parameter is the value of the field - `any`

```vue
<template>
  <div>
    <div class="error-message">{{ $ve(email, 'required') }}</div>

    <input v-model="email" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
};
</script>
```

### Notes

- The `$ve` function is accessible in all Vue templates without the need to import or pass it explicitly.
- Ensure that the validators provided to `$ve` are correctly defined in your custom validators setup.
- `$ve` is reactive and will re-evaluate its validators when the input value changes.
- For more complex validations, consider using Vue's computed properties or methods.

### i18n Integration

If your application uses Vue i18n, Vue Pattern Validator can utilize it to return localized error messages. Ensure i18n is set up in your Vue application before initializing the validator plugin.

## Custom Validators

You can create custom validators as per your application's requirements. Each validator is a function that takes the field value and an optional translation function `t`. It should return a string with an error message when validation fails, or `true` if validation passes.

```typescript
import { Validators } from 'vue-pattern-validator';

const customValidators: Validators = {
  customRule: (val, t) => {
    if (val does not meet some condition) {
      return t ? t('custom.error.message') : 'Default error message';
    }
    return true;
  }
};
```

## License

Vue Pattern Validator is [ISC licensed](https://opensource.org/licenses/ISC). 

Contribute to the library or report issues on the [GitHub repository](https://github.com/shahidullahkhankhattak/vue-pattern-validator).
