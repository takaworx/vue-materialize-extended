<template>
  <ul id='dropdown1' class='dropdown-content'>
      <li v-for="(option, key) in options" :key="key" @click="selectedOption = option.value">
          <a href="#!"><img :src="option.flag" class="selected-flag" /> {{ option.text }}</a>
      </li>
  </ul>
</template>
<script>
import UseragentMixin from './../../mixins/useragent'
export default {
  data() {
      return {
          selectedOption: this.selected,
      }
  },
  mixins: [UseragentMixin],
  mounted() {
    if(!this.isMobile) {
        const triggerElement = document.getElementById('triggerbox')
        triggerElement.dataset.target = 'dropdown1'
        this.dropdown = M.Dropdown.init(triggerElement)
    }
  },
  props: ['options'],
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
.selected-flag {
  line-height: 56px;
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  width: 33%;
  margin-right: 4px;
}
</style>