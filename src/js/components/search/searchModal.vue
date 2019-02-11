<template>
  <div id="searchmodal" ref="searchmodal" class="modal bottom-sheet input-field-select-modal">
    <div class="modal-content">
      <div class="modal-header">
        {{ title }}
        <a class="modal-header-action confirm"
          href="#" @click="modalConfirm">
          Confirm
        </a>
        <a class="modal-header-action cancel"
          href="#" @click="modalClose">
          Cancel
        </a>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['open', 'title'],
  data() {
      return {
          modal: null,
      }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.searchmodal, { dismissible: false })
  },
  watch: {
    open(newval, oldval) {
      if (newval) {
        this.modal.open()
      }

      if (!newval) {
        this.modalClose()
      }
    }
  },
  methods: {
    modalClose() {
      this.modal.close()
      this.$emit('onModalClose', false)
    },
    modalConfirm() {
      this.$emit('onModalConfirm', true)
      this.modalClose()
    }
  }
}
</script>

<style scoped>
.modal-content {
  position: inherit;
}
</style>