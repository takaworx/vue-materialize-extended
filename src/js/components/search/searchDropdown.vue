<template>
  <ul id='dropdown1' class='dropdown-content' style="max-height: calc(100vh - 400px)!important;overflow-y:unset">
      <li class="searchcontainer" style="padding: 5px!important"><input type="text" ref="search_dropdown_input" placeholder="Search" v-model="search"/></li>
      <li class="optionslist" style="max-height: calc(100vh - 474px)!important;overflow-y:scroll">
        <ul>
          <li v-for="(option, key) in clonedOptions" :key="key" @click.prevent="onOptionClick(option)">
            <a href="#!"><img :src="option.flag" class="selected-flag" /> {{ option.text }}</a>
          </li>
        </ul>
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
        const triggerElement = this.$parent.$refs.triggerbox
        triggerElement.dataset.target = 'dropdown1'
        this.dropdown = M.Dropdown.init(triggerElement, { container: this.$parent.$refs.search_dropdown, closeOnClick: false, coverTrigger: false, onOpenEnd: this.onOpenEnd })
        this.clonedOptions = this.options
    }
  },
  methods: {
    onOpenEnd() {
      this.$refs.search_dropdown_input.focus()
    },
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
      this.dropdown && this.dropdown.recalculateDimensions()
    }
  }
}
</script>
<style scoped>
.optionslist:hover, .searchcontainer:hover {
  background: #FFF;
}
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
@media (min-width: 400px) {
    .selected-flag {
        width: 15%;
    }
}
.dropdown-content {
  top: 100% !important;
  max-height: calc(100vh - 350px) !important;
}
</style>