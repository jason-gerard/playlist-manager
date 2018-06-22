<template>
    <div id="view-song">
        <div v-if='error' class="col s6 offset-s3 error">{{ error }}</div>
        <SongView v-else v-bind:song="song" v-on:remove="$router.push({ name: 'all-songs' })"/>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
import SongView from '@/components/SongView'

export default {
    name: 'single-song',
    components: {
        SongView
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
