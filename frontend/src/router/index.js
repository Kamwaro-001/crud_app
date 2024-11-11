import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import DetailsView from '@/views/DetailsView.vue'
import ForgotPassView from '@/views/ForgotPassView.vue'
import ResetPassView from '@/views/ResetPassView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'user-profile',
      component: ProfileView
    },
    {
      path: '/edit',
      name: 'edit-profile',
      component: DetailsView
    },
    // {
    //   path: '/profile',
    //   name: 'user-profile',
    //   component: ProfileView,
    //   children: [
    //     {
    //       path: 'edit',
    //       name: 'edit-profile',
    //       component: DetailsView
    //     }
    //   ]
    // },
    {
      path: '/change-password',
      name: 'change-password',
      component: ForgotPassView
    },
    {
      path: '/reset',
      name: 'reset-password',
      component: ResetPassView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorView
    }
  ]
})

export default router
