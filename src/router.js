import Vue from 'vue';
import auth from './services/auth';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	//mode: 'history',
	routes: [
		{ name: 'login', path: '/login', component: () => import('./views/LoginView.vue') },
		{ name: 'home', path: '/', component: () => import('./views/HomeView.vue'), beforeEnter: requireAuth },
		{ path: '*', redirect: '/login'}
	]
});

function requireAuth(to, from, next) {
	if ( ! auth.loggedIn() ) {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		});
	} else {
		next();
	}
}

export default router;

/* router.beforeEach(async (to, from, next) => {
	const route = {};
	const isLogged = await store.dispatch(types.USER_CHECK);
	const onLogin = to.path === '/login';

	if (isLogged && onLogin)
		route.path = '/';

	if (!isLogged && !onLogin)
		route.path = '/login';

	if (!isLogged && !onLogin && to.path !== '/')
		route.query = {
			redirect: to.path
		};

	next(route.path ? route : undefined);
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title + ' - Media Tool';
	next();
});
 */
