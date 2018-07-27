<template>
    <div id="all-songs">
        <SongView :song='song' v-for='song in songs' v-bind:key="song.id" v-on:remove='getAllSongs'/>
    </div>
</template>

<script>
import SongService from '@/services/SongService';
import SongView from '@/components/SongView';

export default {
	name: 'all-songs',
	components: {
		SongView
	},
	data: () => {
		return {
			songs: []
		};
	},
	methods: {
		async getAllSongs() {
			try {
				// send get request to api for all songs
				this.songs = (await SongService.getall()).data.songs;
			} catch (error) {
				console.log(error);
			}
		}
	},
	async created() {
		this.getAllSongs();
	}
};
</script>

<style scoped>
.add-song-btn {
	margin-bottom: 80px;
}
</style>
