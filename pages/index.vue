<template>
    <div>
        <div class="features">
            <div v-for="feature in features" :key="feature.title" class="feature">
                <p class="feature-title">{{ feature.title }}</p>
                <hr class="divider">
                <p class="desc" v-html="feature.desc"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ExtendedOptions } from "~/types/options.interfaces";

interface User {
    username: string,
    locale: string;
    premium_type: number;
    mfa_enabled: boolean;
    flags: number;
    avatar: string;
    discriminator: string;
    id: string;
}

interface Traits {
    name: string;
    createdAt: string;
}

interface SatisMeterConfig {
    writeKey: string;
    userId?: string;
    traits?: Traits;
}

@Component(<ExtendedOptions>{
    name: "Home",
    resource: "Features",
    data() {
        return {
            features: [],
            title: "Home"
        };
    },
    head() {
        return {
            title: `Jeanne | ${this.title}`,
            meta: [
                {
                    hid: "og-title",
                    property: "og:title",
                    content: `Jeanne | ${this.title}`
                },
                {
                    hid: "og-url",
                    property: "og:url",
                    content: "https://jeannebot.info"
                },
                {
                    hid: "twitter-title",
                    name: "twitter:title",
                    content: `Jeanne | ${this.title}`
                }
            ]
        };
    },
    created() {
        // Inject satismeter script only on the homepage
        if (process.browser) {
            const userString = localStorage.getItem("user");
            const config: SatisMeterConfig = {
                writeKey: "mdz26zo4FRZrjbkS"
            };

            if (userString) {
                try {
                    const user: User = JSON.parse(userString);
                    config.userId = user.id;
                    config.traits = {
                        name: user.username,
                        createdAt: (new Date()).toISOString()
                    };
                } catch (e) { }
            }

            const satismeter = document.createElement("script");
            satismeter.type = "text/javascript";
            satismeter.defer = true;
            satismeter.innerHTML = `(function() { window.satismeter = window.satismeter || function() {(window.satismeter.q = window.satismeter.q || []).push(arguments);};window.satismeter.l = 1 * new Date();var script = document.createElement("script");var parent = document.getElementsByTagName("script")[0].parentNode;script.async = 1;script.src = "https://app.satismeter.com/satismeter.js";parent.appendChild(script);})(); satismeter(${JSON.stringify(config)});`;
            document.body.appendChild(satismeter);
        }
    },
    async beforeMount() {
        await this.$utils.sleep(1);
        this.$store.commit("updateTitle", "Home");

        try {
            this.features = await this.$getResource("features");
        } catch (e) {
            console.error(e);
            this.$utils.alertError(e.message);
        }
    }
})
export default class HomePage extends Vue {};
</script>

<style lang="sass">
    @import "../assets/sass/main.sass"

    .features
        display: flex
        justify-content: space-around
        flex-wrap: wrap
        margin: 2rem 0
        & > p
            padding: 8px
        & > .feature
            width: calc((100% - 1rem) / 3)
            min-width: 260px
            margin: .5rem .1rem .5rem .1rem
            align-self: flex-start
            & > .feature-title
                text-align: center
                padding: 7px 8px 4px
                font-size: 20px
                font-weight: 500
                color: $title
            & > .desc
                text-align: center
                color: $text
                margin: 0 1.5rem 0 1.5rem

    .divider
        height: 3px
        margin: .5rem 1.5rem .5rem 1.5rem
        padding: 0
        display: block
        border: 0
        transition: margin-left .3s cubic-bezier(.4, 0, .2, 1)
        will-change: margin-left
</style>
