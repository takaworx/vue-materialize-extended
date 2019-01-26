<template>
    <form @submit.prevent="submit" :autocomplete="autocomplete">
        <fieldset :disabled="onTransit">
            <slot></slot>
        </fieldset>
    </form>
</template>

<script>
export default {
    props: [
        'autocomplete',
        'params',
    ],
    methods: {
        setData(data) {
            this.data = data;
        },
        setTransit(mode) {
            this.onTransit = mode;
        },
        setTransitFalse() {
            this.setTransit(false);
        },
        submit() {
            this.setTransit(true);
            this.$emit('submit', this.setTransitFalse, this.data);
        }
    },
    data() {
        return {
            data: null,
            onTransit: false,
        }
    },
    created() {
        this.data = this.setData(this.params);
    }
}
</script>
