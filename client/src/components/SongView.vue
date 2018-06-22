<template>
    <div id="song-view">
        <div class="card horizontal s12">
            <div class="card-image">
                <img :src="song.coverArt">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <div>
                        <i class="fas fa-play-circle"></i>
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
                    <div class="song-options">
                        <a :href="'#edit-song-modal-' + song.id" class='modal-trigger btn edit-song-btn'>Edit</a>
                        <a @click='delete_song' class='btn red edit-song-btn'>Delete</a>
                    </div>
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
    name: 'song-view',
    components: {
        EditSongModal
    },
    props: [
        'song'
    ],
    methods: {
        async delete_song() {
            try {
                // sends delete request to server
                const song = await SongService.delete(this.song.id)
                // redirects user to new song page
                this.$router.push({
                    name: 'all-songs'
                })
            } catch(error) {
                this.error = error.response.data.error
            }
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
.song-options {
    margin-left: auto;
}
</style>
