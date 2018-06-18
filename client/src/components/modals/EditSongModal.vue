<template>
    <div id="edit-song-modal" class='modal'>
        <div class="row modal-content">
            <h3 class='center-align'>Edit Song</h3>
            <div v-if='error' class="col s6 offset-s3 error">{{ error }}</div>
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
                    <label for="coverArt">Cover Art</label>
                </div>
            </form>
        </div>
        <div class="row modal-footer">
            <div class="col s6 offset-s3">
                <button type="submit" @click="save" class='btn'>Save Changes</button>
                <button class='modal-close btn'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import SongService from '@/services/SongService'

export default {
    name: 'edit-song-modal',
    props: [
        'song'
    ],
    data: () => {
        return {
            error: null
        }
    },
    methods: {
        async save() {
            // resets error to null
            this.error = null

            // checks to see if all fields are filled in
            const completed = Object.keys(this.song).every(key => !!this.song[key])
            if (!completed) {
                this.error = 'Must fill in all fields'
                return
            }

            try {
                // send put request to back end to update song
                await SongService.update(this.song)
                // closes modal
                $('#edit-song-modal').modal('close')
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>
