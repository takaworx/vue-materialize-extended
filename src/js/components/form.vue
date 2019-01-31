<template>
    <form @submit.prevent="submit" :autocomplete="autocomplete" class="vme-form">
        <fieldset :disabled="onTransit">
            <slot></slot>
        </fieldset>
        <div v-if="showSpinner" class="spinner-backdrop">
            <div class="preloader-wrapper active">
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            onTransit: false,
        }
    },
    created() {
        this.data = this.setData(this.params);
    },
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
    computed: {
        showSpinner() {
            if (this.spinner == null || ! this.spinner) {
                return false
            }

            return this.onTransit
        }
    },
    props: [
        'autocomplete',
        'spinner',
        'params',
    ],
}
</script>
