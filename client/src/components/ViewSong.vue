<template>
    <div id="view-song">
        <div v-if='error' class="col s6 offset-s3 error">{{ error }}</div>
        <div v-else class="card horizontal s12">
            <div class="card-image">
                <img :src="song.coverArt">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <div>
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="artist-info">
                        <router-link tag='a' to='/' class="grey-text">{{ song.artist }}</router-link>
                        <router-link tag='a' to='/' class="grey-text text-darken-3">{{song.title}}</router-link>
                    </div>
                </div>
                <div class="card-action">
                    <div class='card-likes'>
                        <p style='margin-right: 8px'><i class="fas fa-heart"></i></p>
                        <p>500</p>
                    </div>
                    <a href="#edit-song-modal" class='modal-trigger btn edit-song-btn'>Edit Song</a>
                </div>
            </div>
            <EditSongModal v-bind:song='song'/>
        </div>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
import EditSongModal from '@/components/modals/EditSongModal'

export default {
    name: 'view-song',
    components: {
        EditSongModal
    },
    data: () => {
        return {
            song: {},
            error: null
        }
    },
    async created() {
        // gets song id from parameters
        const songId = this.$store.state.route.params.songId
        try {
            // fetches one song from db with id
            this.song = (await SongService.getone(songId)).data.song
            this.error = (await SongService.getone(songId)).data.error
        } catch(error) {
            this.error = error.response.data.error
        }
    }
}
</script>

<style>
.artist-info {
    display: flex;
    flex-direction: column;
}
.fa-play-circle {
    font-size: 40px;
    color: #009688;
    margin-right: 10px;
    margin-top: 2px;
}
.card-content {
    display: flex
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
.edit-song-btn {
    margin-left: auto;
}
</style>
