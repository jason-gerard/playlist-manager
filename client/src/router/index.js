import Vue from 'vue'
import Router from 'vue-router'
import AllSongs from '@/components/AllSongs'
import AddSong from '@/components/AddSong'
import SignUp from '@/components/SignUp'
import UserProfile from '@/components/UserProfile'
import SingleSong from '@/components/SingleSong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/songs',
      name: 'all-songs',
      component: AllSongs
    },
    {
      path: '/song/:songId',
      name: 'single-song',
      component: SingleSong
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
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: UserProfile
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
