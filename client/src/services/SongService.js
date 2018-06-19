import Api from '@/services/Api'

export default {
    // gets all songs
    getall() {
        return Api().get('songs')
    },
    // creates new song
    add(song) {
        return Api().post('songs', song)
    },
    // gets one song
    getone(songId) {
        return Api().get(`songs/${songId}`)
    },
    // updates a song
    update(song) {
        return Api().put(`songs/${song.id}`, song)
    },
    // deletes a song
    delete(songId) {
        return Api().delete(`songs/${songId}`)
    }
}