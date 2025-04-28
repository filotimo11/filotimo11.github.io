import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import GameView from '../views/GameView.vue'
import WordCloudView from '../views/WordCloudView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books',
      component: BookView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/wordcloud',
      name: 'wordcloud',
      component: WordCloudView
    }
  ]
})

export default router
