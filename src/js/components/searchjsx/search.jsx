import SearchModal1 from './searchModal1.jsx'
import SearchModalOptions1 from './searchModalOptions1.jsx'

export default {
  props: {
    options: {
      type: Array
    },
    name: {
      type: String
    },
  },

  render (createElement) {
    return (
    <select
      name="name"
      ref="search"
      onClick="alert('aloha')">
      <SearchModalOptions1
        options={this.options}
        name="name">
      </SearchModalOptions1>
    </select>
    )
  },

  methods: {
      setClickEventHandler() {
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
      }
  },

  mounted() {
    // console.log('hello? from vme')
    this.createBottomSheet(this.createOptions())
  },

  components: {
      SearchModalOptions1,
  },
}