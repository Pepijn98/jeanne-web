<template>
    <div>
        <div class="settings">
            <div v-for="setting in settings" :key="setting.title" class="card setting">
                <div class="card-header setting-title">
                    <p class="card-header-title setting-name">
                        {{ setting.title }}
                    </p>
                </div>
                <div class="card-content setting-description">
                    <div class="content" v-html="setting.description"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Settings',
        resource: 'Settings',
        data() {
            return {
                settings: [],
                title: 'Settings'
            };
        },
        head () {
            return {
                title: `Jeanne | ${this.title}`,
                meta: [
                    { hid: 'og-title', property: 'og:title', content: `Jeanne | ${this.title}` },
                    { hid: 'og-url', property: 'og:url', content: `https://jeannebot.info/${this.title.toLowerCase()}` },
                    { hid: 'twitter-title', name: 'twitter:title', content: `Jeanne | ${this.title}` }
                ]
            }
        },
        async beforeMount() {
            await this.$utils.sleep(1);
            this.$store.commit('updateTitle', 'Settings');
            this.settings = await this.$getResource('settings');
        }
    };
</script>

<style lang="sass" scoped>
    @import "../../assets/sass/main.sass"

    .settings
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: flex-start
        & > .setting
            width: 512px
            margin: 10px
            background-color: $background
            & > .setting-title
                & > .setting-name
                    font-family: Exo, sans-serif
                    font-weight: 500
                    font-size: 20px
                    color: $text
                    width: 400px
                    display: inline-block
            & > .setting-description
                font-size: 14px
                & > .content
                    color: $text
</style>
