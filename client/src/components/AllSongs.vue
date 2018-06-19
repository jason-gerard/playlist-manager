<template>
    <div id="all-songs">
        <div v-for='song in songs' v-bind:key="song.id" class="card horizontal s12">
            <div class="card-image">
                <img :src="song.coverArt">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <div>
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="artist-info">
                        <router-link tag='a' to='/user/' class="grey-text">{{ song.artist }}</router-link>
                        <router-link tag='a' :to='song.songPage' class="grey-text text-darken-3">{{song.title}}</router-link>
                    </div>
                </div>
                <div class="card-action">
                    <p style='margin-right: 8px'><i class="fas fa-heart"></i></p>
                    <p>500</p>
                </div>
            </div>
        </div>
        
        <div class="fixed-action-btn">
            <router-link to='/add-song' class="btn-floating btn-large teal"><i class="fas fa-plus"></i></router-link>
        </div>
    </div>
</template>

<script>
import SongService from '@/services/SongService'

export default {
    name: 'all-songs',
    data: () => {
        return {
            songs: []
        }
    },
    async created() {
        try {
            // send get request to api for all songs
            this.songs = (await SongService.getall()).data.songs
        } catch(error) {
            console.log(error);
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
</style>
