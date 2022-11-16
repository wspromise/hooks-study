import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/loading',
  },
  {
    path: '/loading',
    name: 'Loading',
    meta: {
      titleName: 'router.loading',
    },
    component: () => import('../views/demo/loading/index.vue'),
  },
];
// process.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
