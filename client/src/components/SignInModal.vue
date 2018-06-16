<template>
    <div id="sign-in-modal" class='modal'>
        <div class="row modal-content">
            <h3 class='center-align'>Sign In</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
            <form autocomplete="off">
                <div class="input-field col s6 offset-s3">
                    <input type="email" name="email" v-model='email'>
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input type="password" name="password" v-model='password'>
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
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async signin() {
            try {
                // send api request to back end to signin in and auth user
                const response = await UserService.signin({
                    email: this.email,
                    password: this.password
                })

                // sets state for token and user
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                // closes modal on success
                $('#sign-in-modal').modal('close')
            } catch(error) {
                // displays error
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style>
.error {
  color: red;
}
</style>