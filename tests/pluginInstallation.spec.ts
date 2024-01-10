import { createApp } from 'vue';
import { createVuePatternValidatorPlugin } from '../src';

describe('Plugin Installation', () => {
  it('should install the plugin correctly', () => {
    const app = createApp({});
    const customValidators = {
        required: (value: any) => !value && 'Field is required'
    };
    app.use(createVuePatternValidatorPlugin(customValidators));
    expect(app.config.globalProperties.$v).toBeDefined();
    expect(app._context.provides.validate).toBeDefined();
  });
});