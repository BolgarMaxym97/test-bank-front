<template>
    <div id="app">
        <top-bar v-if="isLoggedIn"></top-bar>
        <b-container fluid>
            <b-row>
                <b-col class="main-content">
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TopBar from "@/components/layout/TopBar";
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
            };
        },
        components: {
            TopBar,
        },
        computed: {
            ...mapGetters([
                "isLoggedIn"
            ])
        },
    };
</script>

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    @import "/assets/scss/colors";

    #app {
        font-family: Roboto, serif;
        height: calc(100% - 56px);
    }

    .main-content {
        margin: 56px 0 0 0
    }
</style>