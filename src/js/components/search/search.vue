<template>
    <div class="input-field box dark">
        <div id="triggerbox" class="input-field-select" @click="onClick">
            <img v-if="confirmedSelectedValue && options && options.find(o => o.value == confirmedSelectedValue)" :src="options.find(o => o.value == confirmedSelectedValue).flag" class="selected-flag" />
            {{ ((options && options.find(o => o.value == confirmedSelectedValue)) && options.find(o => o.value == confirmedSelectedValue).text) 
            || label }}
        </div>
        <label for="triggerbox" class="search-label active">{{ label }}</label>
        <SearchDropdown :options="clonedOptions" @onChange="onSelectedDropdownOptionChange" />
        <SearchModal
            :title="title"
            :open="modalOpen"
            @onModalClose="modalOpen = false"
            @onModalConfirm="onModalConfirm">
            <input type="text" placeholder="Search" v-model="search" style="width:90%"/>
            <SearchModalOptions
                :options="clonedOptions"
                @onChange="onSelectedOptionChange"
                name="search"
                :selected="selected" />
        </SearchModal>
    </div>
</template>

<script>
import SearchModal from './searchModal.vue'
import SearchModalOptions from './searchModalOptions.vue'
import SearchDropdown from './searchDropdown.vue'
import UseragentMixin from './../../mixins/useragent'

export default {
    mixins: [UseragentMixin],
    components: {
        SearchModal,
        SearchModalOptions,
        SearchDropdown
    },
    data() {
        return {
            confirmedSelectedValue: null,
            unconfirmedSelectedValue: null,
            modalOpen: false,
            search: null,
            clonedOptions: null,
        }
    },
    props: [
        'options',
        'label',
        'name',
        'selected',
        'title'
    ],
    methods: {
        onClick() {
            if(this.isMobile) {
                this.modalOpen = !this.modalOpen
            }
        },
        onSelectedOptionChange(val) {
            this.unconfirmedSelectedValue = val
        },
        onSelectedDropdownOptionChange(val) {
            this.confirmedSelectedValue = val
        },
        onModalConfirm() {
            this.confirmedSelectedValue = this.unconfirmedSelectedValue
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
    watch: {
        confirmedSelectedValue(val) {
            this.$emit('input', val)
        },
        search(val) {
            this.countrySearch(val)
            console.log('the val', val)
        },
        options(options) {
            this.clonedOptions = options
        }
    },
    mounted() {
        this.confirmedSelectedValue = this.selected
    }
}
</script>

<style scoped>
.input-field-select {
    text-align: left;
}
.input-field-select label {
    font-size: 16px;
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