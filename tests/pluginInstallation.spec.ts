import { createApp } from 'vue';
import { createVuePatternValidatorPlugin } from '../src';

describe('Plugin Installation', () => {
  it('should install the plugin correctly', () => {
    const app = createApp({});
    const customValidators = {
        required: (value: any) => value && value.length > 0 ? true : 'Field is required'
    };
    app.use(createVuePatternValidatorPlugin(customValidators));
    expect(app.config.globalProperties.$ve).toBeDefined();
    expect(app._context.provides.validate).toBeDefined();
  });
});