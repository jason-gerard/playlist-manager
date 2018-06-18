import Vue from 'vue'
import Router from 'vue-router'
import AllSongs from '@/components/AllSongs'
import AddSong from '@/components/AddSong'
import SignUp from '@/components/SignUp'
import UserProfile from '@/components/UserProfile'
import ViewSong from '@/components/ViewSong'

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
      name: 'view-song',
      component: ViewSong
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
