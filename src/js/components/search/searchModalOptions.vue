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
          <img :src="option.flag" class="selected-flag" />
          {{ option.text }}
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
    },
    options(options) {
      if(options.length > 0) {
        this.selectedOption = options[0].value
      }
    }
  }
}
</script>

<style scoped>
.align-left {
  text-align: left;
}
.selected-flag {
  line-height: 56px;
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  width: 10%;
  margin-right: 4px;
}
.input-field-select-options {
  height: -webkit-calc(100vh - 104px);
  height: -moz-calc(100vh - 104px);
  height: calc(100vh - 104px);
  overflow-y: auto;
}
</style>