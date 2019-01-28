<template>
    <div class="input-field box dark">
        <div id="triggerbox" class="input-field-select" @click="onClick">
            <label for="input-field-select search-field-label" >
                {{ ((options && options.find(o => o.value == confirmedSelectedValue)) && options.find(o => o.value == confirmedSelectedValue).name) 
                || label }}
            </label>
        </div>
        <SearchDropdown :options="options" @onChange="onSelectedDropdownOptionChange"/>
        <SearchModal
            :title="title"
            :open="modalOpen"
            @onModalClose="modalOpen = false"
            @onModalConfirm="onModalConfirm">
            <SearchModalOptions
                :options="options"
                @onChange="onSelectedOptionChange"
                name="search"
                :selected="1" />
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
</style>