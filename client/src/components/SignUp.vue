<template>
    <div id="sign-up">
        <div class="row">
            <h3 class='center-align'>Sign Up</h3>
            <div>{{ error }}</div>
            <div class="input-field col s6 offset-s3">
                <input type="text" name="username" v-model='username'>
                <label for="username">Username</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input type="email" name="email" v-model='email'>
                <label for="email">Email</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input type="password" name="password" v-model='password'>
                <label for="password">password</label>
            </div>
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
            username: '',
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async signup() {
            try {
                const response = await UserService.signup({
                    username: this.username,
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
