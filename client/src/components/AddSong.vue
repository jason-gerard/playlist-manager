<template>
    <div id="add-song">
        <div class="row">
            <h3 class='center-align'>Add Song</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
            <form autocomplete="off">
                <div class="col s10 offset-s1">
                    <div class="col s6">
                        <div class="input-field">
                            <input type="text" name="title" v-model='song.title' required>
                            <label for="title">Title</label>
                        </div>
                        
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>Audio File</span>
                                <input type="file" name="audioFile" @change='onAudioFileSelected' required>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text">
                            </div>
                        </div>
                        <a @click='upload' class='btn left'>Upload Song</a>
                    </div>
                    <div class="col s4 offset-s1">
                        <img v-if="!song.coverArt" class='responsive-img cover-art' src="http://localhost:3000/public/song-data/default-cover-art.png">
                        <img v-else class='responsive-img cover-art' :src="coverArtPreview">
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>Cover Art</span>
                                <input type="file" name="coverArt" @change='onCoverArtSelected' required>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                coverArt: null,
                audioFile: null
            },
            coverArtPreview: null,
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
                // create new form data object
                const fd = new FormData()
                // add song title to form data
                fd.append('title', this.song.title)
                // add cover art to form data
                fd.append('coverArt', this.song.coverArt, this.song.coverArt.name)
                // add audio file to form data
                fd.append('audioFile', this.song.audioFile, this.song.audioFile.name)

                // post song object to server to store in db and gets song in repsonse
                const song = await SongService.add(fd)
                // redirects user to new song page
                this.$router.push({
                    name: 'single-song',
                    params: {
                        songId: song.data.song.id
                    }
                })
            } catch(error) {
                this.error = error.response.data.error
            }
        },
        onCoverArtSelected(event) {
            this.song.coverArt = event.target.files[0]

            // displays uploaded image in form for a preview
            let reader = new FileReader()
            reader.readAsDataURL(this.song.coverArt)
            reader.onload = img => {
                this.coverArtPreview = img.target.result
            }
        },
        onAudioFileSelected(event) {
            this.song.audioFile = event.target.files[0]
        }
    }
}
</script>

<style>
.cover-art {
    max-width: 100%;
}
</style>
