<template>
    <div id="sign-up">
        <div class="row">
            <h3 class='center-align'>Sign Up</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
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
                    <label for="password">password</label>
                </div>
            </form>
            <div class="col s6 offset-s3">
                <button type="submit" @click='signup' class='btn'>Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'sign-up',
    data: () => {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            error: null
        }
    },
    methods: {
        async signup() {
            // resets error to null
            this.error = null

            // checks to see if all fields are filled in
            const completed = Object.keys(this.user).every(key => !!this.user[key])
            if (!completed) {
                this.error = 'Must fill in all fields'
                return
            }

            try {
                // send api request to back end to create and auth user
                const response = await UserService.signup(this.user)

                // sets state for token and user
                this.$store.dispatch('signin', { user: response.data.user, token: response.data.token })
                
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