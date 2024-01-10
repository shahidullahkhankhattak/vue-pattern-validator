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


### Using `$v` for Validations in Vue Templates

The Vue Pattern Validator library exposes a `$v` function that is globally available in Vue templates. This function is particularly useful for form validations, where you can integrate it into the `:pattern` attribute of input fields.

#### Single Field Validation

For single field validation, use `$v` with the name of your validation rule. It returns a validator function that can be used directly in the `:pattern` attribute of an input.

```vue
<template>
  <input v-model="email" :pattern="$v('email')" />
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

#### Multiple Field Validation

For multiple field validations, you can pass multiple validation names to `$v`. It returns an array of validator functions, which can be used in the `:pattern` attribute.

```vue
<template>
  <input v-model="password" :pattern="$v('minLength', 'containsNumber')" />
</template>

<script>
export default {
  data() {
    return {
      password: '',
    };
  };
</script>
```

### Notes

- The `$v` function is accessible in all Vue templates without the need to import or pass it explicitly.
- Ensure that the validators provided to `$v` are correctly defined in your custom validators setup.
- `$v` is reactive and will re-evaluate its validators when the input value changes.
- For more complex validations, consider using Vue's computed properties or methods.

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
