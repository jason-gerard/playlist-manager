<template>
    <div id="sign-in-modal" class='modal'>
        <div class="row modal-content">
            <h3 class='center-align'>Sign In</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
            <form autocomplete="off">
                <div class="input-field col s6 offset-s3">
                    <input type="email" name="email" v-model='user.email'>
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="password" name="password" v-model='user.password'>
                    <label for="password">password</label>
                </div>
            </form>
        </div>
        <div class="row modal-footer">
            <div class="col s6 offset-s3">
                <button type="submit" @click='signin' class='btn'>Sign In</button>
                <button class='modal-close btn'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'sign-in-modal',
    data: () => {
        return {
            user: {
                email: '',
                password: ''
            },
            error: null
        }
    },
    methods: {
        async signin() {
            // resets error to null
            this.error = null

            // checks to see if all fields are filled in
            const completed = Object.keys(this.user).every(key => !!this.user[key])
            if (!completed) {
                this.error = 'Must fill in all fields'
                return
            }

            try {
                // send api request to back end to signin in and auth user
                const response = await UserService.signin(this.user)

                // sets state for token and user
                this.$store.dispatch('signin', { user: response.data.user, token: response.data.token })

                // closes modal on success
                $('#sign-in-modal').modal('close')
                // redirects to home view
                this.$router.push({
                    name: 'user-profile',
                    params: {
                        userId: this.$store.state.user.id
                    }
                })
            } catch(error) {
                // displays error
                this.error = error.response.data.error
            }
        }
    }
}
</script>
