import VmeForm from './components/form.vue';
import VmeInput from './components/input.vue';
import VmeSelect from './components/select.vue';
import VmeTextarea from './components/textarea.vue';
import VmeSearch from './components/search/search.vue';

const Vme = {
  install(Vue, options) {
    Vue.component('vme-form', VmeForm)
    Vue.component('vme-input', VmeInput)
    Vue.component('vme-select', VmeSelect)
    Vue.component('vme-textarea', VmeTextarea)
    Vue.component('vme-search', VmeSearch)
  }
}

export default Vme;

export {
  VmeForm,
  VmeInput,
  VmeSelect,
  VmeTextarea,
  VmeSearch,
}