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
      <ul class="input-field-select-options">
        {
          this.options.map(option => {
            return (
              <li>
                <label>
                  <input
                    type="radio"
                    name={this.name}
                    value={option.value}
                    className="with-gap"
                  >
                  </input>
                  <span>
                    {option.name}
                  </span>
                </label>
              </li>
            )
          })
        }
      </ul>
    )
  },

  mounted() {
    console.log('the stuff')
  }
}