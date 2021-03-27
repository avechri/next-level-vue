// eslint-disable-next-line import/prefer-default-export
export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
