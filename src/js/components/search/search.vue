<template>
    <div class="input-field box dark">
        <div id="triggerbox" class="input-field-select" @click="onClick">
            <img v-if="confirmedSelectedValue && options && options.find(o => o.value == confirmedSelectedValue)" :src="options.find(o => o.value == confirmedSelectedValue).flag" class="selected-flag" />
            {{ ((options && options.find(o => o.value == confirmedSelectedValue)) && options.find(o => o.value == confirmedSelectedValue).text) 
            || label }}
        </div>
        <label for="triggerbox" class="search-label active">{{ label }}</label>
        <SearchDropdown :options="options" @onChange="onSelectedDropdownOptionChange" />
        <SearchModal
            :title="title"
            :open="modalOpen"
            @onModalClose="modalOpen = false"
            @onModalConfirm="onModalConfirm">
            <SearchModalOptions
                :options="options"
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
        }
    },
    watch: {
        confirmedSelectedValue(val) {
            this.$emit('input', val)
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