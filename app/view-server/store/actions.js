const cookieparser = require('cookieparser')


export default {
    async nuxtClientInit({ commit, state }, context) {
        let auth = null
        const parsed = cookieparser.parse(document.cookie)
        try {
            auth = parsed.auth
        } catch (err) {
            console.dir(err)
        }
        commit('mutateAuth', auth)
    },
}