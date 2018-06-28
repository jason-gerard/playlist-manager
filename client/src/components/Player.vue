<template>
    <div id="player-wrapper" class='grey' v-if='song'>
		<div class="audio-player">
			<div class="artist-info-wrapper">
				<img :src="song.coverArt" alt="Cover Art" class='player-cover-art'>
				<div class="artist-info-player">
					<p>{{ song.title }}</p>
					<p>{{ song.user }}</p>
				</div>
			</div>
			<div class='player-controls-wrapper'>
				<a @click='togglePlayPause' class='play-or-pause-btn'>
					<i v-if='isPlaying' class="fas fa-pause-circle player-controls"></i>
					<i v-else class="fas fa-play-circle player-controls"></i>
				</a>
				<div class="progress">
					<div class="determinate" :style="{ width: progress + '%'}"></div>
				</div>
			</div>
			<span style='min-width: 260px'></span>
		</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'player',
	data() {
		return {
			audio: new Audio(),
			progress: 0
		};
	},
	mounted() {
		this.$store.dispatch('setIsPlaying', false);
		this.$store.dispatch('setSong', null);
	},
	created() {
		this.$store.dispatch('loadSong', { file: null, songId: null });
	},
	computed: {
		...mapState(['isPlaying', 'audioFile', 'songId', 'song'])
	},
	watch: {
		isPlaying(newVal, oldVal) {
			if (newVal) {
				setTimeout(() => {
					this.audio.play();
				}, 150);
			} else {
				this.audio.pause();
			}
		},
		songId(newVal, oldVal) {
			if (this.audioFile) {
				this.audio.pause();
				this.audio = new Audio(this.audioFile);
				setTimeout(() => {
					this.audio.play();
				}, 150);
				this.$store.dispatch('setIsPlaying', true);
				this.audio.addEventListener(
					'timeupdate',
					this.updateProgressBar
				);
			}
		}
	},
	methods: {
		togglePlayPause() {
			// toggles is playing boolean
			this.$store.dispatch('toggleIsPlaying');
		},
		updateProgressBar() {
			let current = this.audio.currentTime;
			let total = this.audio.duration;
			this.progress = parseFloat(current / total * 100);
		}
	}
};
</script>

<style>
#player-wrapper {
	height: 140px;
	display: flex;
	align-items: center;
}
.audio-player {
	height: 120px;
	display: flex;
	width: 100%;
	justify-content: space-between;
}
.player-cover-art {
	width: 120px;
	margin: 0 10px;
}
.player-controls-wrapper {
	width: 800px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.artist-info-wrapper {
	display: flex;
}
.player-controls {
	color: white !important;
	margin: 0px !important;
}
.progress {
	margin-top: 20px;
}
.artist-info-player {
	min-width: 120px;
	max-width: 120px;
	color: white;
	margin-top: 20px;
}
.artist-info-player p {
	margin: 0;
	font-size: 16px;
}
</style>
