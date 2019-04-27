<template>
    <div id="app">
        <nav-bar />
        <vue-progress-bar />
        <div class="container">
            <div class="header">
                <img class="avatar" src="../assets/images/avatar.jpg">
                <span class="h-title">Jeanne | <vue-typer
                    :text="this.$store.state.title"
                    caret-animation="smooth"
                    :type-delay="120"
                    :pre-type-delay="250"
                    :erase-delay="120"
                    :pre-erase-delay="60000"
                    erase-style="backspace" />
                </span>
            </div>
            <div class="main">
                <nuxt />
            </div>
            <div class="ads">
                <adsbygoogle ad-slot="5372000314" />
            </div>
        </div>
        <footer>
            &copy; 2018 — <a href="https://kurozeropb.info"><strong>Kurozero</strong></a> | Made with <a href="https://vuejs.org/" target="_blank">Vuejs</a> and <a href="https://buefy.github.io/" target="_blank">Buefy</a>.<br>
            <a href="https://github.com/KurozeroPB" target="_blank"><i class="fab fa-github" />&nbsp;</a>
            <a href="https://twitter.com/Kurozero_" target="_blank"><i class="fab fa-twitter" />&nbsp;</a>
            <a href="https://discord.gg/p895czC" target="_blank"><i class="fab fa-discord" />&nbsp;</a>
            <a href="https://www.paypal.me/PvdBroek" target="_blank"><i class="fab fa-paypal" />&nbsp;</a>
            <a href="https://www.patreon.com/Kurozero" target="_blank"><i class="fab fa-patreon" />&nbsp;</a>
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ExtendedOptions } from "~/types/options.interfaces";

@Component(<ExtendedOptions>{
    name: "Default",
    data() {
        return {
            title: "Default"
        };
    },
    beforeRouteEnter() {
        this.$nuxt.$loading.start();
    },
    beforeRouteUpdate() {
        this.$nuxt.$loading.start();
    },
    mounted() {
        this.$nextTick(async () => {
            await this.$utils.sleep(500);
            this.$nuxt.$loading.finish();
        });
    }
})
export default class Default extends Vue {};
</script>

<!--suppress SassScssUnresolvedVariable -->
<style lang="scss">
    @import "../assets/sass/main.sass";
    @import "~bulma";
    @import "~buefy/src/scss/buefy";

    @font-face {
        font-family: Exo;
        src: url(../assets/fonts/exo/Exo2-SemiBold.otf);
    }

    html {
        font-family: "Exo", sans-serif !important;
        background: $background url("../assets/images/white-carbon.png");
    }

    body {
        font-size: 100%;
        background: transparent;
        font-family: "Exo", sans-serif !important;
    }

    code {
        padding: 0.01em 0.25em;
        background-color: lighten($background-light, 30%);
    }

    span {
        font-family: "Exo", serif;
    }

    strong {
        color: $text;
    }

    .input {
        border-radius: 0;
        &:focus,
        &:active {
            box-shadow: 0 0 0 0 #fff;
        }
    }

    #app {
        font-family: "Exo", sans-serif;
        .fade-enter-active, .fade-leave-active {
            transition: all .2s ease;
        }
        .fade-enter, .fade-leave-active {
            opacity: 0;
        }
        .main {
            max-width: 1280px;
            border: 1px solid $dark;
            margin: 1rem auto 1.5rem;
            border-radius: 0;
            padding: 1rem 2rem;
            background-color: $background-light;
            & > div {
                margin: 40px 0;
            }
        }
        & > footer {
            text-align: center;
            font-family: "Exo", sans-serif;
            margin: 1rem 0 2rem;
        }
    }

    .header {
        width: auto;
        margin: 1rem auto auto;
        text-align: center;
        & > .avatar {
            max-width: 100px;
            border: 2px solid $dark;
            vertical-align: middle;
            margin-right: 5px;
        }
        & > .h-title {
            width: auto;
            font-weight: 700;
            font-size: 56px;
            color: $primary;
            vertical-align: middle;
        }
    }

    .snackbar {
        &.is-warning {
            background: $warning;
            color: $black;
            & > .action.is-warning > button {
                color: $black !important;
                background-color: $warning !important;
                &:hover {
                    background-color: darken($warning, 5%) !important;
                }
                &:focus {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
                }
            }
        }
        &.is-danger {
            background: $danger;
            & > .action.is-danger > button {
                color: $white !important;
                background-color: $danger !important;
                &:hover {
                    background-color: darken($danger, 5%) !important;
                }
                &:focus {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
                }
            }
        }
    }

    .vue-typer {
        & > span > .custom.char {
            color: $title;
        }
    }

    .adsbygoogle {
        & > ins {
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }
</style>
