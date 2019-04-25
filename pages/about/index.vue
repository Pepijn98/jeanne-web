<template>
    <div>
        <div slot="left-pane" class="about">
            <p class="about-title">About</p>
            <p class="links">
                <b><a class="github" href="https://github.com/KurozeroPB/Jeanne" target="_blank"><i class="fab fa-github" />&nbsp;View Code on Github</a></b><br>
                <b><a class="twitter" href="https://twitter.com/JeanneDiscord" target="_blank"><i class="fab fa-twitter" />&nbsp;Follow on Twitter</a></b><br>
                <b><a class="discord" href="https://discord.gg/p895czC" target="_blank"><i class="fab fa-discord" />&nbsp;Official Discord server</a></b><br>
                <b><a class="paypal" href="https://www.paypal.me/PvdBroek" target="_blank"><i class="fab fa-paypal" />&nbsp;Support using PayPal</a></b><br>
                <b><a class="patreon" href="https://www.patreon.com/Kurozero" target="_blank"><i class="fab fa-patreon" />&nbsp;Support using Patreon</a></b><br>
            </p>
            <div id="developer" class="developer" />
        </div>
        <hr class="divider">
        <div slot="right-pane">
            <p class="donators-title">Donators</p>
            <div id="donators" class="donators" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ExtendedOptions } from "~/types/options.interfaces";

@Component(<ExtendedOptions>{
    name: "About",
    resource: "About",
    data() {
        return {
            title: "About"
        };
    },
    head() {
        return {
            title: `Jeanne | ${this.title}`,
            meta: [
                { hid: "og-title", property: "og:title", content: `Jeanne | ${this.title}` },
                { hid: "og-url", property: "og:url", content: `https://jeannebot.info/${this.title.toLowerCase()}` },
                { hid: "twitter-title", name: "twitter:title", content: `Jeanne | ${this.title}` }
            ]
        };
    },
    async created() {
        if (process.browser) {
            const donators = document.getElementById("donators");
            const developer = document.getElementById("developer");
            try {
                const response = await this.$axios.get("https://api.kurozeropb.info/v1/donators");
                if (this.$utils.isEmptyObject(response)) { // Check if the response is empty
                    const error = new Error("Got an empty response from the server");
                    this.$utils.alertError(error.message);
                    return this.$sentry.captureException(error);
                }

                // Destructing response with all we need
                const { data, status, statusText } = response;
                if (this.$utils.isEmptyObject(data)) { // Check if data is empty
                    const error = new Error("Got an empty response from the server");
                    this.$utils.alertError(error.message);
                    return this.$sentry.captureException(error);
                }

                if (data.donatorsData.length === 0) { // Check if donators is empty
                    const error = new Error("No donators were found");
                    this.$utils.alertError(error.message);
                    return this.$sentry.captureException(error);
                }

                if (data.statusCode >= 400) { // Check if the server send an error code
                    const error = new Error(data.message ? data.message : "Failed to request data from the server");
                    this.$utils.alertError(error.message);
                    return this.$sentry.captureException(error);
                }

                if (status >= 400) { // Check if axios errored
                    const error = new Error(statusText || "Failed to request data from the server");
                    this.$utils.alertError(error.message);
                    return this.$sentry.captureException(error);
                }

                // Developer stuff
                const developerData = data.donatorsData.find((obj) => obj.id === "93973697643155456");
                const developerName = document.createElement("p");
                developerName.className = "developer-name";
                developerName.innerHTML = `${developerData.username}<br/><small>Owner & Developer</small>`;
                const developerImg = document.createElement("img");
                developerImg.className = "developer-image";
                developerImg.src = `https://cdn.discordapp.com/avatars/${developerData.id}/${developerData.avatar}.${developerData.avatar.startsWith("a_") ? "gif" : "png"}?size=128`;
                developerImg.height = 128;
                developerImg.width = 128;
                developer.appendChild(developerName);
                developer.appendChild(developerImg);

                // Donators stuff
                const donatorsData = data.donatorsData.filter((obj) => obj.id !== "93973697643155456");
                await this.$utils.foreachAsync(donatorsData, async (donator) => {
                    // Donator div
                    const donatorsDiv = document.createElement("div");
                    donatorsDiv.className = "donator";
                    // Donator name
                    const donatorName = document.createElement("p");
                    donatorName.className = "donator-name";
                    donatorName.innerText = donator.username;
                    // Donator image
                    const donatorImg = document.createElement("img");
                    donatorImg.className = "donator-image";
                    donatorImg.src = `https://cdn.discordapp.com/avatars/${donator.id}/${donator.avatar}.${donator.avatar.startsWith("a_") ? "gif" : "png"}?size=128`;
                    donatorImg.height = 128;
                    donatorImg.width = 128;

                    // Append created elements
                    donatorsDiv.appendChild(donatorName);
                    donatorsDiv.appendChild(donatorImg);
                    donators.appendChild(donatorsDiv);
                });
            } catch (e) {
                this.$utils.alertError(e.message);
                this.$sentry.captureException(e);
            }
        }
    },
    async beforeMount() {
        await this.$utils.sleep(1);
        this.$store.commit("updateTitle", "About");
    }
})
export default class AboutPage extends Vue {};
</script>

<style lang="sass">
    @import "../../assets/sass/main.sass"

    .links
        text-align: center
        font-size: 18px
        padding: 0 0 8px
        & .github
            color: #0A0A0A
        & .twitter
            color: #1DA1F2
        & .discord
            color: #7289DA
        & .paypal
            color: #253B80
        & .patreon
            color: #F96854

    .divider
        height: 3px
        margin: 1.5rem
        padding: 0
        display: block
        border: 0
        transition: margin-left .3s cubic-bezier(.4, 0, .2, 1)
        will-change: margin-left

    .about-title, .donators-title
        text-align: center
        padding: 0 0 8px
        font-size: 40px
        font-weight: 500
        color: $title

    .developer
        & > .developer-name
            text-align: center
            padding: 7px 8px 4px
            font-size: 20px
            font-weight: 500
            color: $title
            & > small
                font-size: 15px
        & > .developer-image
            display: block
            margin-left: auto
            margin-right: auto

    .donators
        display: flex
        justify-content: space-around
        flex-wrap: wrap
        margin: 0 0 2rem 0
        & > p, img
            padding: 8px
        & > .donator
            width: calc((100% - 1rem) / 3)
            min-width: 260px
            margin: .5rem 0
            align-self: flex-start
            & > .donator-name
                text-align: center
                padding: 7px 8px 4px
                font-size: 20px
                font-weight: 500
                color: $title
            & > .donator-image
                display: block
                margin-left: auto
                margin-right: auto
</style>
