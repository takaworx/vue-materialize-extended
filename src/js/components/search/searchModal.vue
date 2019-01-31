<template>
  <div id="searchmodal" class="modal bottom-sheet input-field-select-modal">
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
    this.modal = M.Modal.init(document.getElementById('searchmodal'), { dismissible: false })
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
    },
    countrySearch(query) {
        var vm = this;

        return new Promise(function (resolve, reject) {
            var results = _.filter(vm.countries, function (o) {
                return vm.testMatch(o['name'], query) || vm.testMatch(o['callingCodes'][0], query);
            });

            if (results !== null) {
                resolve(results);
            } else {
                reject(results);
            }
        });

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
  }
}
</script>