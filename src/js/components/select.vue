<template>
    <div class="input-field">
        <select v-model="model" ref="select" :id="uid" :disabled="disabled" :tabindex="tabindex" :autofocus="autofocus">
            <option v-if="noMatchFound" :value="null" disabled="true">Select</option>
            <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">{{ option.text }}</option>
        </select>
        <label :for="uid">{{ label }}</label>
    </div>
</template>

<script>
import { findIndex } from 'lodash'

export default {
    props: [
        'uid',
        'label',
        'value',
        'options',
        'disabled',
        'tabindex',
        'autofocus',
    ],
    watch: {
        value(nv, ov) {
            this.setModel(nv);
        },
        model(nv, ov) {
            this.$emit('input', nv);
        },
    },
    computed: {
        noMatchFound() {
            return findIndex(this.options, {
                value: this.model
            }) == -1;
        }
    },
    methods: {
        setModel(val) {
            this.model = val;
        },
        initialize() {
            if (this.instance) {
                this.instance.destroy();
            }

            this.instance = M.FormSelect.init(this.$refs.select);
        }
    },
    data() {
        return {
            model: null,
            instance: null,
        }
    },
    mounted() {
        this.setModel(this.value);
        this.initialize();
    },
    updated() {
        this.initialize();
    }
}
</script>
