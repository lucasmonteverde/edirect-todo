import Vue from 'vue';
import Router from 'vue-router';
import auth from './services/auth';

import AuthView from './views/AuthView.vue';
import HomeView from './views/HomeView.vue';

Vue.use(Router);

const router = new Router({
	//mode: 'history',
	routes: [
		{ name: 'auth', path: '/auth', component: AuthView },
		{ name: 'home', path: '/', component: HomeView, beforeEnter: requireAuth },
		{ path: '*', redirect: '/auth' }
	]
});

function requireAuth(to, from, next) {
	if ( ! auth.loggedIn() ) {
		next({
			path: '/auth'
		});
	} else {
		next();
	}
}

export default router;

/* router.beforeEach((to, from, next) => {
	document.title = to.meta.title + ' - EDirect - Todo List';
	next();
}); */
