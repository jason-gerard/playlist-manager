import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    // jwt token
    token: null,
    user: null,
    isLoggedIn: false,
    isPlaying: false,
    audioFile: null,
    songId: null,
    song: {
      title: null,
      user: null,
      coverArt: null
    }
  },
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setAudioFile(state, file) {
      state.audioFile = file;
    },
    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying;
    },
    setSongId(state, songId) {
      state.songId = songId;
    },
    setSong(state, song) {
      state.song = song;
    }
  },
  actions: {
    signin({ commit }, { user, token }) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setIsLoggedIn', true);
    },
    signout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
      commit('setIsLoggedIn', false);
    },
    toggleIsPlaying({ commit }) {
      commit('toggleIsPlaying');
    },
    loadSong({ commit }, { file, songId }) {
      commit('setAudioFile', file);
      commit('setSongId', songId);
    },
    setIsPlaying({ commit }, isPlaying) {
      commit('setIsPlaying', isPlaying);
    },
    setSong({ commit }, song) {
      commit('setSong', song);
    }
  }
});
