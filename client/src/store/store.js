import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        // jwt token
        token: null,
        // user object
        user: null,
        // boolean value
        isLoggedIn: false,
        // all state for music player
        musicPlayer: {
            music: {
                title: null,
                artist: null,
                src: null,
                pic: null
            },
            isPlaying: false,
            songId: 2
        }
    },
    mutations: {
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        },
        setToken (state, token) {
            state.token = token
        },
        setUser (state, user) {
            state.user = user
        },
        setPlayOrPause(state) {
            state.musicPlayer.isPlaying = !state.musicPlayer.isPlaying
        },
        setSong(state, song) {
            state.musicPlayer.music = song
        }
    },
    actions: {
        signin({ commit }, user, token) {
            commit('setUser', user)
            commit('setToken', token)
            commit('setIsLoggedIn', true)
        },
        signout({ commit }) {
            commit('setUser', null)
            commit('setToken', null)
            commit('setIsLoggedIn', false)
        },
        playOrPause ({ commit }) {
            commit('setPlayOrPause')
        },
        loadSong ({ commit }, song) {
            commit('setSong', song)
        }
    },
    getters: {
        getIsPlaying: state => {
            return state.musicPlayer.isPlaying
        }
    }
})