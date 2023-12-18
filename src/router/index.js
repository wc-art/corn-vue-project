import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/datasets/:species?',
      name: 'Datasets',
      component: () => import('@/views/datasets/index.vue'),
    },
    {
      path: '/models/:species?',
      name: 'Models',
      component: () => import('@/views/models/index.vue'),
    },
    {
      path: '/hpo/:species?',
      name: 'HPO',
      component: () => import('@/views/trainning/HPO.vue'),
    },
    {
      path: '/trainningmodels/:species?',
      name: 'TrainningModels',
      component: () => import('@/views/trainning/index.vue'),
      props: true
    },
    {
      path: '/prediction/:species?',
      name: 'Prediction',
      component: () => import('@/views/prediction/index.vue'),
    },
    {
      path: '/study/:species?',
      name: 'StudyResults',
      component: () => import('@/views/study/index.vue'),
  
    },
    {
      path: '/tutorial/:species?',
      name: 'Tutorial',
      component: () => import('@/views/tutorial/index.vue'),
  
    },
    {
      path: '/contact/:species?',
      name: 'Contact',
      component: () => import('@/views/contact/index.vue')
    },
    {
      path: '/species/:tool',
      name: 'Species',
      component: () => import('@/views/species/index.vue')
    }
  ]
})

export default router
