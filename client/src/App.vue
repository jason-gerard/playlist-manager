<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
    <Player class='player'/>
    <SignInModal/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import SignInModal from '@/components/modals/SignInModal';
import Player from '@/components/Player';

export default {
	name: 'App',
	components: {
		Navbar,
		SignInModal,
		Player
	}
};
</script>

<style>
.error {
	color: red;
}
.player {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
</style>
