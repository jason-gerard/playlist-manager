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
        isLoggedIn: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (token) {
                state.isLoggedIn = true
            } else {
                state.isLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        }
    },
    actions: {
        setToken ({ commit }, token) {
            commit('setToken', token)
        },
        setUser ({ commit }, user) {
            commit('setUser', user)
        }
    }
})