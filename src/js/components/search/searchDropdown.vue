<template>
  <ul id='dropdown1' class='dropdown-content'>
      <li><input type="text" placeholder="Search" v-model="search"/></li>
      <li v-for="(option, key) in clonedOptions" :key="key" @click.prevent="onOptionClick(option)">
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
          search: null,
          clonedOptions: [],
      }
  },
  mixins: [UseragentMixin],
  mounted() {
    if(!this.isMobile) {
        const triggerElement = document.getElementById('triggerbox')
        triggerElement.dataset.target = 'dropdown1'
        this.dropdown = M.Dropdown.init(triggerElement, { container: document.getElementById('search_dropdown'), closeOnClick: false })
    }
  },
  methods: {
    onOptionClick(option) {
      this.selectedOption = option.value
      this.closeDropdown()
    },
    closeDropdown() {
      this.dropdown.close()
    },
    countrySearch(query) {
      this.clonedOptions =  this.options.filter(o => this.testMatch(o['text'], query) || this.testMatch(o['country_name'], query))
    },
    testMatch: function (str1, str2) {
        var regex;

        switch (this.position) {
            case 'start':
                regex = '^' + str2 + '.*$';
                break;
            case 'end':
                regex = '^.*' + str2 + '$';
                break;
            default:
            case 'any':
                regex = '^.*' + str2 + '.*$';
                break;
        }

        var testObj = new RegExp(regex, 'i');

        return testObj.test(str1);
    },
  },
  props: ['options'],
  watch: {
    selectedOption() {
      this.$emit('onChange', this.selectedOption)
    },
    search(val) {
      console.log('the search value', val)
        this.countrySearch(val)
    },
    options(options) {
        this.clonedOptions = options
    },
    clonedOptions(options) {
      this.dropdown.recalculateDimensions()
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