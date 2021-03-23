//BaseSelect comp needs:
//label, select & option elements
//props: label, value, options
//ability to send up selected data
// info is similar to BaseInput comp sp copy paste this code first & change what i need to change

<template>
  <div>
    <label v-if="label">{{ label }}}</label>
    <select :value="value" @input="updateValue" v-bind="$attrs">
      <option
        v-for="oprion in options"
        :key="oprion"
      >{{ option }}</option>>
    </select>>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
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
</script>

<style scoped>

</style>
