import Vue from "vue"
import VueRouter from "vue-router"

import Past_trades from './ui/pages/past_trades';
import Open_orders from './ui/pages/open_orders';
import Dashboard from './ui/pages/dashboard';
import LoginPage from './ui/pages/login';

import store from './store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: { name: 'dashboard' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/past_trades',
        name: 'past_trades',
        component: Past_trades,
		meta: { requiresAuth: true },
    },
    {
        path: '/open_orders',
        name: 'open_orders',
        component: Open_orders,
		meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    /*{
        path: '/logout',
        name: 'logout',
        component: LogoutComponent
    }*/
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    //console.log(to.path, store.state.login.isLoggedIn);
    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.login.isLoggedIn) {
        // redirect to login page
        next({ name: 'login' });
        return;
    }

    // if logged in redirect to dashboard
    if (to.path === '/login' && store.state.login.isLoggedIn) {
        next({ name: 'open_orders' });
        return;
    }

    next()
});

export default router;
