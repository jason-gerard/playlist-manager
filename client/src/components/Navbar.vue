<template>
    <div id='navbar'>
      <nav>
        <div class="nav-wrapper teal">
          <a href="#" data-target="slide-out" class="show-on-large sidenav-trigger"><i class="fas fa-bars"></i></a>
          <div class="container">
            <router-link tag='a' to='/' class="brand-logo">Playlist-Manager</router-link>
            <ul id="nav-mobile" class="right">
              <template v-if='$store.state.isLoggedIn'>
                <router-link tag='li' :to="'/user/' + $store.state.user.id"><a>Profile</a></router-link>
                <li><a @click='signout'>Sign Out</a></li>
              </template>
              <template v-else>
                <router-link tag='li' to='/sign-up'><a>Sign Up</a></router-link>
                <li><a href="#sign-in-modal" class='modal-trigger'>Sign In</a></li>
              </template>
            </ul>
          </div>
        </div>
      </nav>

      <ul id="slide-out" class="sidenav">
        <router-link tag='li' to='/'><a class="sidenav-close">Home</a></router-link>
        <template v-if='$store.state.isLoggedIn'>
          <router-link tag='li' to='/add-song'><a class="sidenav-close">Add Song</a></router-link>
        </template>
      </ul>
    </div>
</template>

<script>
export default {
    methods: {
      signout() {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        // redirects to home view
        this.$router.push({name: 'all-songs'})
      }
    }
}
</script>


<style>
.sidenav-trigger {
  width: 10px;
}
#navbar {
  margin-bottom: 30px;
}
</style>
