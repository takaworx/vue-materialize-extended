<template>
    <div class="input-field">
        <textarea v-model="model"
            ref="textarea"
            :id="uid"
            :class="textareaClass"
            :rows="rows"
            :cols="cols"
            :placeholder="placeholder"
            :tabindex="tabindex"
            :disabled="disabled"
            :maxlength="maxlength"
            :autofocus="autofocus">
        </textarea>
        <label :for="uid" :class="{ 'active': isLabelActive }">{{ label }}</label>
    </div>
</template>

<script>
export default {
    props: [
        'uid',
        'type',
        'label',
        'rows',
        'cols',
        'value',
        'disabled',
        'tabindex',
        'autofocus',
        'maxlength',
        'placeholder',
    ],
    watch: {
        value(newval, oldval) {
            this.setModel(newval);
        },
        model(newval, oldval) {
            this.$emit('input', newval);
        },
        type(newval, oldval) {
            this.initMultiline();
        }
    },
    computed: {
        isLabelActive() {
            if ((this.model == null || !this.model.length) && this.placeholder == null) {
                return false;
            }

            return true;
        },
        textareaClass() {
            if (this.type == null || this.type == 'textarea')
                return 'materialize-textarea';
            else {
                return 'materialize-multiline';
            }
        }
    },
    methods: {
        initMultiline() {
            let autosize = require('autosize');

            if (this.type != 'multiline')
                return false;

            this.$refs.textarea.addEventListener('focus', () => {
                autosize(this.$refs.textarea);
            });

            this.$refs.textarea.addEventListener('autosize:resize', (e) => {
                this.$emit('resize', e);
            });
        },
        setModel(val) {
            this.model = val;
        }
    },
    data() {
        return {
            model: null
        }
    },
    mounted() {
        this.setModel(this.value);
        this.initMultiline();
    },
    updated() {
        let autosize = require('autosize');
        autosize.update(this.$refs.textarea);
    }
}
</script>
