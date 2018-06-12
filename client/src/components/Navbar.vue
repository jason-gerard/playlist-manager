<template>
    <div id='navbar'>
      <nav>
        <div class="nav-wrapper teal">
          <a href="#" data-target="slide-out" class="show-on-large sidenav-trigger"><i class="fas fa-bars"></i></a>
          <div class="container">
            <router-link tag='a' to='/' class="brand-logo">Playlist-Manager</router-link>
            <ul id="nav-mobile" class="right">
              <router-link tag='li' to='/sign-up'><a>Sign Up</a></router-link>
              <li><a href="#login-modal" class='modal-trigger'>Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <ul id="slide-out" class="sidenav">
        <router-link tag='li' to='/'><a class="sidenav-close">Home</a></router-link>
        <router-link tag='li' to='/add-song'><a class="sidenav-close">Add Song</a></router-link>
      </ul>
    </div>
</template>

<style>
.sidenav-trigger {
  width: 10px;
}
#navbar {
  margin-bottom: 30px;
}
</style>
