<template>
    <div id="player-wrapper">

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'player',
    data () {
        return {
            audio: new Audio()
        }
    },
    mounted() {
        this.$store.dispatch('setIsPlaying', false)
    },
    created() {
        this.$store.dispatch('loadSong', { file: null, songId: null })
    },
    computed: mapState(['isPlaying', 'audioFile', 'songId']),
    watch: {
        isPlaying(newVal, oldVal) {
            if(newVal) {
                setTimeout(() => {
                    this.audio.play()
                }, 150)
            } else {
                this.audio.pause()
            }
        },
        songId(newVal, oldVal) {
            if (this.audioFile) {
                this.audio.pause()
                this.audio = new Audio(this.audioFile)
                setTimeout(() => {
                    this.audio.play()
                }, 150)
                this.$store.dispatch('setIsPlaying', true)
            }
        }
    }
}
</script>

<style>
#player-wrapper {
    height: 120px;
}
.player-cover-art {
    height: 120px!important;
    width: 120px!important;
}
</style>
