<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
    <SignInModal/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import SignInModal from '@/components/modals/SignInModal'

export default {
  name: 'App',
  components: {
    Navbar,
    SignInModal
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
