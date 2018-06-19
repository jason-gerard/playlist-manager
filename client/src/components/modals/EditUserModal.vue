<template>
    <div id="edit-user-modal" class='modal'>
        <div class="row modal-content">
            <h3 class='center-align'>Edit User</h3>
            <div v-if='error' class="col s6 offset-s3 error">{{ error }}</div>
            <form autocomplete="off">
                <div class="input-field col s6 offset-s3">
                    <input type="text" name="username" v-model='user.username' required>
                    <label for="username">Username</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="email" name="email" v-model='user.email' required>
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="password" name="password" v-model='user.password' required>
                    <label for="password">Password</label>
                </div>
            </form>
        </div>
        <div class="row modal-footer">
            <div class="col s6 offset-s3">
                <button type="submit" @click="update" class='btn'>Save Changes</button>
                <button class='modal-close btn'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'edit-user-modal',
    props: [
        'user'
    ],
    data: () => {
        return {
            error: null
        }
    },
    methods: {
        async update() {
            // resets error to null
            this.error = null

            // checks to see if all fields are filled in
            const completed = Object.keys(this.user).every(key => !!this.user[key])
            if (!completed) {
                this.error = 'Must fill in all fields'
                return
            }

            try {
                // send put request to back end to update user
                await UserService.update(this.user)
                // closes modal
                $('#edit-user-modal').modal('close')
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>
