<template>
    <div id="all-songs">
        <div v-for='song in songs' v-bind:key="song.id">
            <SongView :song='song'/>
        </div>
        
        <div class="fixed-action-btn">
            <router-link to='/add-song' class="btn-floating btn-large teal"><i class="fas fa-plus"></i></router-link>
        </div>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
import SongView from '@/components/SongView'

export default {
    name: 'all-songs',
    components: {
        SongView
    },
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
