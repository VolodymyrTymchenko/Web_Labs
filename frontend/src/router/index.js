import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeViews.vue'
import Calculator from '../views/CalculatorView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Profile from '../views/ProfileView.vue'
import { AuthStore } from '../store/index'

const requireAuth = (to, from, next) => {
  const authStore = AuthStore();
  if (authStore.isAuthenticated) {
    next();
  } else {
    next({ name: 'login' });
  }
};

const blockIfAuthenticated = (to, from, next) => {
  const authStore = AuthStore();
  if (authStore.isAuthenticated) {
    next({ name: 'profile' });
  } else {
    next();
  }
};

const routes = [
  { 
    path: '/',
    name: 'home',
    component: Home,
  },
  { 
    path: '/calculator',
    name: 'calculator',
    component: Calculator,
    beforeEnter: requireAuth,
  },
  { 
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: blockIfAuthenticated,
  },
  { 
    path: '/register',
    name: 'register',
    component: Register,
  },
  { 
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
