<!--suppress JSUnresolvedVariable -->
<template>
    <div>
        <div class="search-wrapper">
            <b-autocomplete
                v-model="search"
                :data="commands"
                placeholder="Search command by name.."
                icon="magnify"
                field="name"
                @select="(command) => selected = command">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </div>
        <div class="commands">
            <div v-if="selected !== null" class="card command">
                <div class="card-header cmd-title">
                    <p class="card-header-title cmd-name">s/{{ selected.name }} <span v-if="selected.nsfw" class="nsfw-tag nsfw-tag-text">nsfw</span></p>
                    <a v-if="selected.example" class="card-header-icon">
                        <b-tooltip :label="selected.example ? `s/${selected.name} ${selected.example}` : ''" position="is-left" animated square>
                            <p class="example">Example</p>
                        </b-tooltip>
                    </a>
                </div>
                <div class="card-content cmd-description">
                    <div class="content">{{ selected.description }}</div>
                </div>
                <footer class="cmd-details">
                    <small v-if="command.category" class="cmd-details-item">Category:&nbsp;<code>{{ command.category }}</code></small>
                    <small v-if="selected.usage" class="cmd-details-item">Usage:&nbsp;<code>s/{{ selected.name }} {{ selected.usage }}</code></small>
                    <small v-if="selected.cooldown" class="cmd-details-item">Cooldown:&nbsp;<strong style="font-size: .64rem;">{{ selected.cooldown }}</strong></small>
                    <small v-if="selected.aliases" class="cmd-details-item">Aliases: {{ selected.aliases.join(', ') }}</small>
                </footer>
            </div>
            <div v-else v-for="command in commands" :key="command.name" class="card command">
                <div class="card-header cmd-title">
                    <p class="card-header-title cmd-name">s/{{ command.name }} <span v-if="command.nsfw" class="nsfw-tag nsfw-tag-text">nsfw</span></p>
                    <a v-if="command.example" class="card-header-icon">
                        <b-tooltip :label="command.example ? `s/${command.name} ${command.example}` : ''" position="is-left" animated square>
                            <p class="example">Example</p>
                        </b-tooltip>
                    </a>
                </div>
                <div class="card-content cmd-description">
                    <div class="content">{{ command.description }}</div>
                </div>
                <footer class="cmd-details">
                    <small v-if="command.category" class="cmd-details-item">Category:&nbsp;<code>{{ command.category.toLowerCase() }}</code></small>
                    <small v-if="command.usage" class="cmd-details-item">Usage:&nbsp;<code>s/{{ command.name }} {{ command.usage }}</code></small>
                    <small v-if="command.cooldown" class="cmd-details-item">Cooldown:&nbsp;<strong style="font-size: .64rem;">{{ command.cooldown }}s</strong></small>
                    <small v-if="command.aliases" class="cmd-details-item">Aliases: {{ command.aliases.join(', ') }}</small>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Commands',
        resource: 'Commands',
        data() {
            return {
                search: '',
                cmds: [],
                title: 'Commands',
                selected: null
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
        computed: {
            commands() {
                return this.cmds.filter((cmd) => cmd.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0);
            }
        },
        async beforeMount() {
            await this.$utils.sleep(1);
            this.$store.commit('updateTitle', 'Commands');
            const commands = await this.$getResource('commands');
            this.cmds = commands.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        },
        mounted() {
            const sawCommandAlert = localStorage.getItem('sawCommandAlert');
            if (sawCommandAlert !== 'true')
                this.$utils.snackbar({
                    message: 'Description for certain commands will be added later',
                    type: 'is-danger',
                    onAction: () => localStorage.setItem('sawCommandAlert', 'true')
                });
        }
    };
</script>

<!--suppress SassScssUnresolvedVariable -->
<style lang="sass" scoped>
    @import "../../assets/sass/main.sass"

    .search-wrapper
        position: relative
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: flex-start
        margin-bottom: 10px

        .autocomplete
            color: $text
            border: 1px solid $background
            transition: .15s all ease-in-out
            background: $background-light
            width: 500px

    .commands
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: flex-start
        & > .command
            width: 512px
            margin: 10px
            background-color: $background
            & > .cmd-title
                box-shadow: 0 1px 2px $primary
                & > .cmd-name
                    font-family: Exo, sans-serif
                    font-weight: 500
                    font-size: 20px
                    color: $text
                    width: 400px
                    display: inline-block
                    & > .nsfw-tag
                        background: $danger
                        color: #FFF
                        font-size: 12px
                        vertical-align: middle
                        cursor: pointer
                        padding: 0 4px
                        margin: 2px 4px 2px 6px
                        display: inline-block
                        height: 18px
                        line-height: 18px
                        &:hover
                            opacity: .85
                & > a > span > .example
                    background-color: transparent
                    color: $text
                    border: 1px solid $text
                    font-size: 1rem
                    padding: calc(0.375em - 1px) calc(0.625em - 1px)
            & > .cmd-description
                font-size: 14px
                & > .content
                    color: $text
            & > .cmd-details
                border-top: 1px solid $primary
                font-size: 14px
                & > .cmd-details-item
                    color: $text
                    align-items: center
                    display: flex
                    flex-basis: 0
                    flex-grow: 1
                    flex-shrink: 0
                    padding: 0 0.75rem 0.2rem 0.75rem
</style>
