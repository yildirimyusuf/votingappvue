import BaseTemplate from "./Template.html";
import Vue from 'vue';
export default Vue.extend({
  template: BaseTemplate,
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
});