<template>
    <div>
        <div class="input-field box dark">
            <div class="input-field-select" @click="setClickEventHandler">
                <label for="input-field-select">{{ label }}</label>
            </div>
        </div>
        <searchModal1
         id="searchmodal"
         :options="options"
         :modal="modal"
         />
    </div>
</template>

<script>
import M from 'materialize-extended'
import SearchModal from './searchModal'
import searchModal1 from './searchModal1'
import SearchModalOptions from './searchModalOptions'
import SearchModalOptions1 from './searchModalOptions1.jsx'

export default {
    data() {
        return {
            searchModel: null,
            modal: null,
        }
    },
    components: {
        SearchModalOptions1,
        searchModal1
    },
    props: [
        'options',
        'label',
        'name',
        'selected'
    ],
    mounted() {
        console.log('hello? from vme')
        // this.createBottomSheet(this.createOptions())
        document.addEventListener('DOMContentLoaded', () => {
            console.log('dom content loaded')
            let elems = document.getElementById('searchmodal')
            this.modal = M.Modal.init(elems)
            // this.modal = M.Modal.getInstance(elems)
            console.log('the modal', this.modal)
            this.modal.open()
        });
    },
    methods: {
        setClickEventHandler() {
            // this.modal.open()
            // this.openModal = true
            this.modal.open()
        },
        createBottomSheet(elOptionsUl) {
            // Create a modal element
            let modalElement = SearchModal.create(elOptionsUl, this.label)
            // Append modal element to body
            document.body.appendChild(modalElement)
            // Initialize the modal element into a materialize modal class
            this.modal = new SearchModal(modalElement)
        },
        createOptions() {
            return SearchModalOptions.create(this.$refs.search, this.name)
        },
        onSelect(val) {
            this.$emit('input', val)
        }
    },
    watch: {
        selected(newval, oldval) {
            this.searchModel = newval;
        },
        searchModel(newval, oldval) {
            console.log('search model changed')
            this.$emit('input', newval)
            this.$emit('change', newval)
        }
    }
}
</script>