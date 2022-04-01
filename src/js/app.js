import { createApp } from "vue";
// import * as VueRouter from "vue-router";
import FormWizard from "../components/FormWizard/FormWizard.vue";
import TabContent from "../components/FormWizard/TabContent.vue";
import ValidationHelper from "../components/FormWizard/ValidationHelper.vue";
import Quiz from "../components/Quiz.vue";
import Results from "../components/Results";
import Account from "../components/Account";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

export {
  FormWizard,
  TabContent,
  ValidationHelper,
  Quiz,
  createRouter,
  createWebHashHistory,
  createWebHistory
};
import "vue2-animate/dist/vue2-animate.min.css";
/**
 * imports
 */

import "../css/app.css";

/**
 * vuex
 * auto-import all modules and prepare shared store
 */
const modules = {};

/**
 * create vue instance function
 */
const createVueApp = () => {
  const app = createApp({});
  // app.config.globalProperties.authToken = "999999999911111111aaaaaa";
  // app.config.globalProperties.base_url = "https://mellow-badlands-ejgkwjycd9xj.vapor-farm-c1.com";
  app.config.globalProperties.authToken =
    "9kC7tJXBOSBZH5sCYoqbEYozve68clBZyE6p1xKA";
  app.config.globalProperties.base_url =
    "https://api.evyana.com";
  app.config.globalProperties.debug = true;

  /**
   * vue components
   * auto-import all vue components
   */
  const vueComponents = require.context("../components/", true, /\.(vue|js)$/);
  vueComponents.keys().forEach((key) => {
    const component = vueComponents(key).default;
    // if a component has a name defined use the name, else use the path as the component name
    const name = component.name
      ? component.name
      : key
          .replace(/\.(\/|vue|js)/g, "")
          .replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase());

    app.component(name, component);
  });

  /**
   * vue mixins
   * auto-register all mixins with a 'global' keyword in their filename
   */
  const mixins = require.context("../mixins/", true, /.*global.*\.js$/);

  mixins.keys().forEach((key) => {
    app.mixin(mixins(key).default);
  });

  /**
   * vue directives
   * auto-register all directives with a 'global' keyword in their filename
   */
  const directives = require.context("../directives/", true, /.*global.*\.js$/);

  directives.keys().forEach((key) => {
    const directive = directives(key).default;
    app.directive(directive.name, directive.directive);
  });

  /**
   * vue plugins
   * extend with additional features
   */
  // app.use(router);
  return app;
};

const routes = [
  { path: "/result", component: Results },
  { path: "/account", component: Account },
  { path: "/", component: Quiz },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next)=>{
  if ( to.path === '/' && window.location.pathname !== '/pages/quiz' && window.location.pathname !== '/pages/your-quiz-results' && window.location.search.indexOf('email=') === -1){
    window.location.href = '/pages/quiz'
  } else {
    next();
  }
})

/**
 * create and mount vue instance(s)
 */
const appElement = document.querySelector("#vueapp");
if (appElement) {
  createVueApp().use(router).mount(appElement);
} else {
  const vueElements = document.querySelectorAll("[vue]");
  if (vueElements) vueElements.forEach((el) => createVueApp().use(router).mount(el));
}

/**
 * fixes for Shopify sections
 * 1. properly render vue components on user insert in the theme editor
 * 2. reload the current page to rerender async inserted sections with vue components
 *
 * add the 'vue' keyword to the section's wrapper classes if the section uses any vue functionality e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", (event) => {
    if (event.target.classList.value.includes("vue")) {
      createVueApp().mount(event.target);
    }
  });
} else if (!Shopify.designMode && process.env.NODE_ENV === "development") {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((record) => {
      const vue = Array.from(record.addedNodes).find(
        (node) => node.classList && node.classList.value.includes("vue")
      );
      if (vue) window.location.reload();
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
