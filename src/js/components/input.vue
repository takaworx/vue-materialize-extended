<template>
    <div class="input-field">
        <input v-model="model"
            :id="uid"
            :type="type"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :tabindex="tabindex"
            :maxlength="maxlength"
            :autofocus="autofocus"
            :disabled="disabled"
            @focus="onInputFocus" />
        <label :for="uid" :class="{ 'active': isLabelActive }">{{ label }}</label>
    </div>
</template>

<script>
export default {
    props: [
        'type',
        'uid',
        'label',
        'value',
        'disabled',
        'tabindex',
        'maxlength',
        'autofocus',
        'placeholder',
        'autocomplete',
    ],
    watch: {
        value(newval, oldval) {
            this.model = newval;
        },
        model(newval, oldval) {
            this.$emit('input', newval);
        }
    },
    computed: {
        isLabelActive() {
            if ((this.model == null || !this.model.length) && this.placeholder == null) {
                return false;
            }

            return true;
        },
    },
    methods: {
        onInputFocus(e) {
            this.$emit('focus', e);
        }
    },
    data() {
        return {
            model: null
        }
    },
    mounted() {
        this.model = this.value;
    }
}
</script>
