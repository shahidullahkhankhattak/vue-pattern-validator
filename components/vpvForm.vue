<template>
    <form @submit.prevent="handleSubmit">
      <slot></slot>
    </form>
  </template>
  
  <script>
  export default {
    name: 'VpvForm',
    props: {
        action: String
    },
    methods: {
      handleSubmit(event) {
        let errors = {};
        let isValid = true;
  
        this.$slots.default().forEach(node => {
          if (node.type.name === 'VpvInput' && node.props['vpv-rules']) {
            const rules = node.props['vpv-rules'];
            const value = node.el.value;
  
            // Apply each rule
            rules.forEach(rule => {
              const error = rule(value);
              if (error) {
                isValid = false;
                errors[node.el.name] = error;
              }
            });
          }
        });
  
        if (!isValid) {
          this.$emit('onSubmit', event, errors);
        } else {
          this.$emit('onSubmit', event);
        }
      }
    }
  };
  </script>