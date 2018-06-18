<template>
    <div id="add-song">
        <div class="row">
            <h3 class='center-align'>Add Song</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
            <form autocomplete="off">
                <div class="input-field col s6 offset-s3">
                    <input type="text" name="title" v-model='song.title' required>
                    <label for="title">Title</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="text" name="artist" v-model='song.artist' required>
                    <label for="artist">Artist</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="text" name="coverArt" v-model='song.coverArt' required>
                    <label for="password">CoverArt</label>
                </div>
            </form>
            <div class="col s6 offset-s3">
                <button type="submit" @click='upload' class='btn'>Upload Song</button>
            </div>
        </div>
    </div>
</template>

<script>
import SongService from '@/services/SongService'

export default {
    name: 'add-song',
    data: () => {
        return {
            song: {
                title: null,
                artist: null,
                coverArt: null
            },
            error: null
        }
    },
    methods: {
        async upload() {
            // resets error to null
            this.error = null

            // checks to see if all fields are filled in
            const completed = Object.keys(this.song).every(key => !!this.song[key])
            if (!completed) {
                this.error = 'Must fill in all fields'
                return
            }

            try {
                // post song object to server to store in db and gets song in repsonse
                const song = await SongService.add(this.song)
                // redirects user to new song page
                this.$router.push({
                    name: 'view-song',
                    params: {
                        songId: song.data.song.id
                    }
                })
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>