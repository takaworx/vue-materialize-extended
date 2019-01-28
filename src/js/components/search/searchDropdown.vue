<template>
  <ul id='dropdown1' class='dropdown-content'>
      <li v-for="(option, key) in options" :key="key" @click="selectedOption = option.value">
          <a href="#!"><i class="material-icons">flag</i>{{ option.name }}</a>
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
        document.addEventListener('DOMContentLoaded', () => {
            const triggerElement = document.getElementById('triggerbox')
            triggerElement.dataset.target = 'dropdown1'
            this.dropdown = M.Dropdown.init(triggerElement)
        })
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