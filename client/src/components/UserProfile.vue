<template>
    <div id="user-profile">
        <div v-if='error' class="col s6 offset-s3 error">{{ error }}</div>
        <div v-else>
            <div class="row">
                <div class="col s4">
                    <h4>Username: {{ user.username }}</h4>
                    <h5>Email: {{ user.email }}</h5>
                    <div class="user-options" v-if='$store.state.isLoggedIn && $store.state.user.id === user.id'>
                        <a href="#edit-user-modal" class='modal-trigger btn'>Edit</a>
                        <a @click='deleteUser' class='btn red edit-song-btn'>Delete</a>
                    </div>
                </div>
                <div class="col s8">
                    <h3>{{ user.username }}'s Songs</h3>
                    <div class="user-songs">
                        <SongView :song='song' v-for='song in user.songs' v-bind:key="song.id" v-on:remove='getUserData'/>
                    </div>
                </div>
            </div>
            <EditUserModal v-bind:user='user'/>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService'
import EditUserModal from '@/components/modals/EditUserModal'
import SongView from '@/components/SongView'

export default {
    name: 'user-profile',
    components: {
        EditUserModal,
        SongView
    },
    data: () => {
        return {
            user: {},
            error: null
        }
    },
    watch: {
        '$route.params.userId' () {
            this.getUserData()
        }
    },
    async created() {
        this.getUserData()
    },
    methods: {
        async getUserData() {
            // gets user id from parameters
            const userId = this.$store.state.route.params.userId
            try {
                // fetches the user data from db
                let response = (await UserService.getone(userId)).data
                this.user = response.user
                this.error = response.error
            } catch(error) {
                this.error = error.response.data.error
            }
        },
        async deleteUser () {
            try {
                // sends delete request to server
                const song = await UserService.delete(this.user.id)
                // redirects user to new song page
                this.$router.push({
                    name: 'sign-up'
                })
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style>
.user-options {
    margin-top: 20px;
}
</style>
