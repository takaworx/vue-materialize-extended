<template>
  <ul class="input-field-select-options">
    <li v-for="(option, key) in options" :key="key">
      <label>
        <input
          type="radio"
          class="with-gap"
          :name="name"
          :value="option.value"
          v-model="selectedOption"
        />
        <span class="align-left">
          <i class="material-icons">flag</i>
          {{ option.name }}
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
      return {
          selectedOption: this.selected,
      }
  },
  props: ['options', 'name', 'selected'],
  watch: {
    selectedOption() {
      this.$emit('onChange', this.selectedOption)
    }
  }
}
</script>

<style scoped>
.align-left {
  text-align: left;
}
</style>