import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/modal',
  },
  {
    path: '/loading',
    name: 'Loading',
    meta: {
      titleName: 'router.loading',
    },
    component: () => import('../views/demo/loading/index.vue'),
  },
  {
    path: '/modal',
    name: 'Modal',
    meta: {
      titleName: 'router.modal',
    },
    component: () => import('../views/demo/modal/index.vue'),
  },
];
// process.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
