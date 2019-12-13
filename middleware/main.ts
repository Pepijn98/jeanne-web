import Buefy from "buefy";
import NavBar from "~/components/NavBar.vue";
import Vue from "vue";
import VueMeta from "vue-meta";
import VueProgressBar from "vue-progressbar";
import resource from "~/plugins/resource";

Vue.config.productionTip = false;

Vue.use(Buefy, { defaultModalScroll: "keep" });
Vue.use(VueProgressBar, { color: "#2A3744", failedColor: "#FF0000", thickness: "4px" });
Vue.use(VueMeta);
Vue.use(resource, { endpoint: "https://kurozeropb.info/api/v1/jeanne" });

Vue.component("NavBar", NavBar);
