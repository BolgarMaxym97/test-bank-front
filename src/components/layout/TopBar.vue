<template>
    <div class="top-bar">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <router-link to="/">
                <b-navbar-brand>
                    {{title}}
                </b-navbar-brand>
            </router-link>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown :text="userName" right>
                    <b-dropdown-item @click="logout">LogOut</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        computed: {
            userName() {
                return this.$store.getters.userName;
            },
            title() {
                return process.env.VUE_APP_TITLE;
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("logout")
                    .then(() => {
                        this.$router.push("/login");
                    });
            },
        }
    };
</script>

<style lang="scss" scoped>

    .top-bar {
        position: fixed;
        width: 100%;
        z-index: 999;
    }
</style>