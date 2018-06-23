<template>
    <div id="player-wrapper">
        <Player :music="music" ref='player'/>
        <button @click='playOrPause'>play / pause</button>
        <button @click='loadSong'>Load Song</button>
    </div>
</template>

<script>
import VueAplayer from 'vue-aplayer'
// remove badge for player
VueAplayer.disableVersionBadge = true

export default {
    components: {
        Player: VueAplayer
    },
    data: () => {
        return {
            music: null
        }
    },
    computed: {
        isPlaying() {
            return this.$store.getters.getIsPlaying
        }
    },
    watch: {
        isPlaying() {
            this.playOrPause(this.isPlaying)
        }
    },
    created() {
        this.loadSong()
    },
    methods: {
        playOrPause(isPlaying) {
            if (isPlaying) {
                this.$refs.player.play()
            } else {
                this.$refs.player.pause()
            }
        },
        getMusic() {
            this.music = this.$store.state.musicPlayer.music
        },
        loadSong() {
            this.$store.dispatch('loadSong', {
                title: 'Esketittt',
                artist: 'Lil Pump Jet Ski',
                src: 'http://localhost:3000/public/song-data/default-audio-file.mp3',
                pic: 'http://localhost:3000/public/song-data/default-cover-art.png'
            })
            this.getMusic()
        }
    }
}
</script>

<style>
.aplayer-body {
    height: 120px;
}
.aplayer-pic {
    height: 120px!important;
    width: 120px!important;
}
</style>
