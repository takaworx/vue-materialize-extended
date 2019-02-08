import SearchModalOptions1 from './searchModalOptions1.jsx'
import M from 'materialize-extended'

export default {
  props: {
    open: {
      type: Boolean
    },
    options: {
      type: Array
    },
    title: {
      type: String,
      default: 'Select',
    },
    modal: {},
  },

  render (createElement) {
    return (
      this.createModal()
    )
  },

  methods: {
    createConfirmButton() {
      return <a class="modal-header-action confirm" href="#" onClick={this.modal.close()}>Confirm</a>
    },
    createCancelButton() {
      return <a class="modal-header-action cancel" href="#" onClick={this.modal.close()}>Cancel</a>
    },
    createHeader() {
      return (
        <div class="modal-header">
          {this.title}
          {this.createCancelButton()}
          {this.createConfirmButton()}
        </div>
      )
    },
    createContent() {
      return (
        <div class="modal-content">
          {this.createHeader()}
          <SearchModalOptions1
            options={this.options}
            name="name" />
        </div>
      )
    },
    createModal() {
      return (
      <div class="modal bottom-sheet input-field-select-modal">
        {this.createContent()}
      </div>
      )
    }
  },
}