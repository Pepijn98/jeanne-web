import Vue from 'vue';
import Buefy from 'buefy';
import VueMeta from 'vue-meta';
import VueProgressBar from 'vue-progressbar';
import NavBar from '~/components/NavBar';
import resource from '~/plugins/resource';
import * as resources from '~/resources';

Vue.config.productionTip = false;

Vue.use(Buefy, { defaultModalScroll: 'keep' });
Vue.use(VueProgressBar, { color: '#2A3744', failedColor: '#FF0000', thickness: '4px' });
Vue.use(VueMeta);
Vue.use(resource, { resources, endpoint: 'https://api.kurozeropb.info/v1/projects' });

Vue.component('NavBar', NavBar);
