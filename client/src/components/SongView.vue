<template>
    <div id="song-view">
        <div class="card horizontal s12">
            <div class="card-image">
                <img :src="song.coverArt">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <div>
                        <a @click='playSong' class='play-or-pause-btn'>
                            <i v-if='isPlaying && songId == this.song.id' class="fas fa-pause-circle"></i>
                            <i v-else class="fas fa-play-circle"></i>
                        </a>
                    </div>
                    <div class="artist-info">
                        <router-link tag='a' :to="'/user/' + song.userId" class="grey-text">{{ song.user }}</router-link>
                        <router-link tag='a' :to="'/song/' + song.id" class="grey-text text-darken-3">{{song.title}}</router-link>
                    </div>
                </div>
                <div class="card-action">
                    <div class='card-likes'>
                        <p style='margin-right: 8px'><i class="fas fa-heart"></i></p>
                        <p>500</p>
                    </div>
                    <div class="song-options" v-if="$store.state.isLoggedIn && $store.state.user.id === song.userId">
                        <a :href="'#edit-song-modal-' + song.id" class='modal-trigger btn edit-song-btn'>Edit</a>
                        <a @click='deleteSong' class='btn red edit-song-btn'>Delete</a>
                    </div>
                </div>
            </div>
            <EditSongModal v-bind:song='song'/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SongService from '@/services/SongService';
import EditSongModal from '@/components/modals/EditSongModal';

export default {
	name: 'song-view',
	components: {
		EditSongModal
	},
	props: ['song'],
	computed: mapState(['isPlaying', 'songId']),
	methods: {
		async deleteSong() {
			try {
				// sends delete request to server
				const song = await SongService.delete(this.song.id);

				this.$emit('remove');
			} catch (error) {
				this.error = error.response.data.error;
			}
		},
		loadSong() {
			// updates song info
			this.$store.dispatch('setSong', {
				title: this.song.title,
				user: this.song.user,
				coverArt: this.song.coverArt
			});
			// updates audio file in vuex
			this.$store.dispatch('loadSong', {
				file: this.song.audioFile,
				songId: this.song.id
			});
		},
		togglePlayPause() {
			// toggles is playing boolean
			this.$store.dispatch('toggleIsPlaying');
		},
		playSong() {
			// loads new song
			if (this.songId != this.song.id) {
				this.loadSong();
			} else {
				// if not new song will toggle play pause
				this.togglePlayPause();
			}
		}
	}
};
</script>

<style>
.artist-info {
	display: flex;
	flex-direction: column;
}
.fa-play-circle,
.fa-pause-circle {
	font-size: 40px;
	color: #009688;
	margin-right: 10px;
	margin-top: 2px;
}
.card-content {
	display: flex;
}
.card-action {
	display: flex;
}
.card-action p {
	margin-top: 7px;
}
.card-image {
	width: 150px;
}
.card {
	height: 150px;
	margin: 20px auto;
}
.card-likes {
	display: flex;
}
.song-options {
	margin-left: auto;
}
.play-or-pause-btn {
	cursor: pointer;
}
</style>
