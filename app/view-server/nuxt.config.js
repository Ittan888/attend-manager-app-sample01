const colors = require('vuetify/es5/util/colors').default
require('dotenv').config()

module.exports = {
    mode: 'spa',
    server: {
        port: 3000, // デフォルト: 3000
        host: '127.0.0.1', // デフォルト: localhost
    },
    /*
     ** Headers of the page
     */
    env: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },

    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
            },
            {
                rel: 'stylesheet',
                href:
                    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
            },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/nuxt-client-init.js', ssr: false },
        '~/plugins/element-ui',
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/dotenv',
        '@nuxtjs/apollo',
    ],

    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'http://127.0.0.1:5000/query',
                // Subscription用にWebSocketの設定も追加します。
                // wsEndpoint: 'ws://localhost:4000/graphql',
                httpLinkOptions: {
                    fetchOptions: {
                        // mode: 'no-cors', //Cors Needed for external Cross origins, need to allow headers from server
                        accept: '*/*',
                        'content-type': 'application/json',
                    },
                    // credentials: 'omit', //must be omit to support application/json content type
                },
                // websocketsOnly: true,
            },
        },
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
}
