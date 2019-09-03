<!--suppress HtmlUnknownTarget -->
<template>
    <nav id="navbar" class="navbar is-primary">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item is-size-4 has-text-weight-bold" href="/Jeanne">Jeanne</a>
                <a class="navbar-item is-size-5-desktop" href="https://twitter.com/JeanneDiscord" target="_blank"><i class="fab fa-twitter" /></a>
                <a class="navbar-item is-size-5-desktop" href="https://github.com/KurozeroPB/Jeanne" target="_blank"><i class="fab fa-github" /></a>
                <a class="navbar-item is-size-5-desktop" href="https://discord.gg/p895czC" target="_blank"><i class="fab fa-discord" /></a>

                <button class="button is-primary navbar-burger" @click="toggleMenu">
                    <span />
                    <span />
                    <span />
                </button>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-start">
                        <a class="navbar-item is-size-5-desktop" href="/Jeanne/settings/"><i class="fas fa-cogs"><span>&nbsp;Settings</span></i></a>
                        <a class="navbar-item is-size-5-desktop" href="/Jeanne/commands/"><i class="fas fa-list-ul"><span>&nbsp;Commands</span></i></a>
                        <a class="navbar-item is-size-5-desktop" href="/Jeanne/about/"><i class="fas fa-info-circle"><span>&nbsp;About</span></i></a>
                        <a class="navbar-item is-size-5-desktop" href="https://discordapp.com/oauth2/authorize?&client_id=237578660708745216&scope=bot&permissions=66186303" target="_blank"><i class="fas fa-external-link-alt"><span>&nbsp;Invite</span></i></a>
                        <a v-if="!token" class="navbar-item is-size-5-desktop" href="https://api.kurozeropb.info/v1/discord/login"><i class="fas fa-sign-in-alt"><span>&nbsp;Login</span></i></a>
                        <a v-else class="navbar-item is-size-5-desktop" @click="logout"><i class="fas fa-sign-out-alt"><span>&nbsp;Logout</span></i></a>
                        <!-- <a class="navbar-item is-size-5-desktop" @click="notAvailable"><i class="fas fa-sign-in-alt"><span>&nbsp;Login</span></i></a> -->
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ComponentOptions } from "vue/types/options";

// Extend ComponentOptions with custom properties
interface ExtendedOptions extends ComponentOptions<Vue> {
    [others: string]: any;
}

@Component(<ExtendedOptions>{
    name: "NavBar",
    data() {
        return {
            token: "",
            user: null,
            expires: 0
        };
    },
    async beforeMount() {
        await this.$utils.sleep(1);
        if (this.$route.query.token && this.$route.query.expires_in) {
            this.token = this.$route.query.token;

            try {
                this.expires = parseInt(this.$route.query.expires_in, 10);
            } catch (e) {
                this.$utils.alertError(e.message);
                return window.location.replace("/");
            }

            localStorage.setItems({
                "refresh": true,
                "token": this.token,
                "expires_in": (new Date()).getTime() + this.expires
            });

            const options = { headers: { Authorization: `Bearer ${this.token}` } };
            try {
                const { data, status, statusText } = await this.$axios.get("https://discordapp.com/api/users/@me", options);

                if (this.$utils.isEmptyObject(data)) { // Check if data is empty
                    const error = new Error("Got an empty response from the server");
                    this.$utils.alertError(error.message);
                    return this.$raven.captureException(error);
                }

                if (status >= 400) {
                    const error = new Error(statusText || "Failed to request data from the server");
                    this.$utils.alertError(error.message);
                    return this.$raven.captureException(error);
                }

                this.user = data;
                localStorage.setItem("user", JSON.stringify(this.user));
                this.$router.push({ path: this.$route.path });
                // this.$router.push({ path: this.$route.path, query: { q: 'value' } });
                // this.$router.push({ name: this.$route.name, query: { q: 'value' } });
            } catch (e) {
                this.$utils.alertError(e.message);
                this.$raven.captureException(e);
            }
        } else {
            const refresh = localStorage.getItem("refresh");
            let timeout = 0;
            if (refresh === "true") {
                try {
                    timeout = parseInt(localStorage.getItem("expires_in"), 10);
                } catch (e) {
                    localStorage.removeItems(["token", "user", "expires_in"]);
                    this.$utils.alertError(e.message);
                    return window.location.replace("/");
                }

                if (!timeout || new Date().getTime() > timeout) {
                    localStorage.setItem("refresh", "false");
                    localStorage.removeItems(["token", "user", "expires_in"]);
                    this.$utils.alertError("Session expired, please login again");
                    await this.$utils.sleep(2000);
                    window.location.replace("/");
                }
            }

            const user = localStorage.getItem("user");
            this.user = user ? JSON.parse(user) : null;
            this.token = localStorage.getItem("token");
        }
    },
    methods: {
        toggleMenu(e) {
            e.target.classList.toggle("is-active");
            return document.querySelector(".navbar-menu").classList.toggle("is-active");
        },
        async logout() {
            try {
                await this.$axios.get(`https://api.kurozeropb.info/v1/discord/revoke?token=${this.$data.token}`);
                localStorage.removeItems(["token", "user", "expires_in"]);
                window.location.reload(true);
            } catch (e) {
                this.$utils.alertError(e.message);
                this.$sentry.captureException(e);
            }
        }
    }
})
export default class NavBar extends Vue {};
</script>

<style lang="sass">
    @import "../assets/sass/main.sass"

    #navbar
        position: sticky
        top: 0
        z-index: 1000

        .navbar-brand > a > .icon
            justify-content: normal

        .icon
            margin-right: 10px
            height: 1rem
            width: 1rem
            vertical-align: sub
            & > i::before
                margin-right: 10px
                height: 1rem
                width: 1rem
</style>
