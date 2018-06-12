<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
    <login-modal/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import LoginModal from '@/components/LoginModal'

export default {
  name: 'App',
  components: {
    Navbar,
    LoginModal
  }
}
</script>
