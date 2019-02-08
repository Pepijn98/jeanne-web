const toml = require('toml');
const fs = require('fs');
const settings = toml.parse(fs.readFileSync('./settings.toml'));

module.exports = {
    head: {
        title: 'Jeanne',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'author', name: 'author', content: 'Kurozero' },
            { hid: 'description', name: 'description', content: 'Jeanne, A feature rich discord bot' },
            { hid: 'theme-color', name: 'theme-color', content: '#281F32' },
            { hid: 'twitter-card', name: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter-site', name: 'twitter:site', content: '@JeanneDiscord' },
            { hid: 'twitter-title', name: 'twitter:title', content: 'Jeanne' },
            { hid: 'twitter-description', name: 'twitter:description', content: 'Jeanne, A feature rich discord bot' },
            { hid: 'twitter-image', name: 'twitter:image', content: 'https://jeannebot.info/avatar.jpg' },
            { hid: 'twitter-creator', name: 'twitter:creator', content: '@Kurozer0' },
            { hid: 'og-title', property: 'og:title', content: 'Jeanne' },
            { hid: 'og-url', property: 'og:url', content: 'https://jeannebot.info' },
            { hid: 'og-image', property: 'og:image', content: 'https://jeannebot.info/avatar.jpg' },
            { hid: 'og-type', property: 'og:type', content: 'website' },
            { hid: 'og-site_name', property: 'og:site_name', content: 'jeannebot.info' },
            { hid: 'og-description', property: 'og:description', content: 'Jeanne, A feature rich discord bot.' },
            { hid: 'og-locale', property: 'og:locale', content: 'en-US' },
            { hid: 'application-name', property: 'application-name', content: 'Jeanne' },
            { hid: 'fragment', property: 'fragment', content: '!' },
            { hid: 'apple-mobile-web-app-capable', property: 'apple-mobile-web-app-capable', content: 'yes' },
            { hid: 'msapplication-config', property: 'msapplication-config', content: 'https://kurozeropb.info/head-icons/browserconfig.xml' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous' },
            { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css' },
            { rel: 'icon', type: 'image/x-icon', href: '/head-icons/favicon.ico' },
            { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: '/head-icons/apple-touch-icon-57x57.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '114x114', href: '/head-icons/apple-touch-icon-114x114.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '72x72', href: '/head-icons/apple-touch-icon-72x72.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '144x144', href: '/head-icons/apple-touch-icon-144x144.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '60x60', href: '/head-icons/apple-touch-icon-60x60.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '120x120', href: '/head-icons/apple-touch-icon-120x120.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '76x76', href: '/head-icons/apple-touch-icon-76x76.png' },
            { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/head-icons/apple-touch-icon-152x152.png' },
            { rel: 'icon', type: 'image/png', href: '/head-icons/favicon-196x196.png' },
            { rel: 'icon', type: 'image/png', href: '/head-icons/favicon-96x96.png' },
            { rel: 'icon', type: 'image/png', href: '/head-icons/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', href: '/head-icons/favicon-16x16.png' },
            { rel: 'icon', type: 'image/png', href: '/head-icons/favicon-128.png' },
            { rel: 'manifest', href: '/head-icons/manifest.json' },
            { rel: 'shortcut icon', href: '/head-icons/favicon.ico' },
            { rel: 'mask-icon', href: '/head-icons/android-chrome-512x512.jpg', color: '#7A202C' }
        ],
        script: [
            /* { src: 'https://cdn.ywxi.net/js/1.js', type: 'text/javascript', async: "", defer: "", body: true } */
        ],
        noscript: [
            { innerHTML: 'This website requires JavaScript.' }
        ]
    },
    plugins: [
        { src: 'plugins/global-utils.js', ssr: false },
        { src: 'plugins/vue-typer.js', ssr: false }
    ],
    modules: [
        '@nuxtjs/component-cache',
        '@nuxtjs/google-analytics',
        // '@nuxtjs/google-adsense',
        '@nuxtjs/sentry'
    ],
    'google-analytics': { id: settings.google.analytics.trackingID },
    /* 'google-adsense': {
        id: settings.google.adsense.adClient,
        analyticsUacct: settings.google.analytics.accountID,
        analyticsDomainName: settings.google.analytics.domain,
        test: settings.google.test
    }, */
    sentry: {
        public_key: settings.sentry.publicKey,
        private_key: settings.sentry.privateKey,
        project_id: settings.sentry.projectID,
        config: { release: settings.version }
    },
    build: {
        extend(config, { isDev, isClient }) {
            if (isDev && isClient)
                config.module.rules.push({ enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/ });
        }
    }
};
