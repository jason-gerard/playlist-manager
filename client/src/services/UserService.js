import Api from '@/services/Api'

export default {
    signup(credentials) {
        return Api().post('users/sign-up', credentials)
    },
    signin(credentials) {
        return Api().post('users/sign-in', credentials)
    }
}