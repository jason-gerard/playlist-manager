<template>
    <div id="login-modal" class='modal'>
        <div class="row modal-content">
            <h3 class='center-align'>Login</h3>
            <div class="col s6 offset-s3 error">{{ error }}</div>
            <div class="input-field col s6 offset-s3">
                <input type="email" name="email" v-model='email'>
                <label for="email">Email</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input type="password" name="password" v-model='password'>
                <label for="password">password</label>
            </div>
        </div>
        <div class="row modal-footer">
            <div class="col s6 offset-s3">
                <button type="submit" @click='login' class='btn'>Login</button>
                <button class='modal-close btn'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
    name: 'login-modal',
    data: () => {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async login() {
            try {
                const response = await UserService.login({
                    email: this.email,
                    password: this.password
                })
            } catch(error) {
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