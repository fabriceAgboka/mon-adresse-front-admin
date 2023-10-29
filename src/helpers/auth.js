export default {
    authenticate(data) {
        localStorage.setItem('user', JSON.stringify(data.user))

        localStorage.setItem('token', data.access_token)
        localStorage.setItem('refreshToken', data.access_token)

        localStorage.setItem('userData', JSON.stringify(data.user))
        localStorage.setItem('userId', data.user.id)
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
        }
    },

    getUser() {
        let u = JSON.parse(localStorage.getItem('userData'))
        if (u) {
            return u
        } else return null
    },

    getSession() {
        return localStorage.getItem('access_token')
    },

    getSession1() {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user) {
            return user.access_token
        } else return null
    },

    logout() {
        delete localStorage.userData
        delete localStorage.userId
    },

    userFullName() {
        let u = JSON.parse(localStorage.getItem('userData'))
        if (u) {
            return u.name
        } else return null
    },
}