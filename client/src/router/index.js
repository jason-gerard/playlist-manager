import Vue from 'vue'
import Router from 'vue-router'
import AllSongs from '@/components/AllSongs'
import AddSong from '@/components/AddSong'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'all-songs',
      component: AllSongs
    },
    {
      path: '/add-song',
      name: 'add-song',
      component: AddSong
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    }
  ]
})
