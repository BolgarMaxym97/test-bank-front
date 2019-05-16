<template>
    <div class="login">
        <b-card
                class="text-center auth-card"
                header="Test Bank Application"
                header-bg-variant="dark"
                header-text-variant="white"
                :title="isLogin ? 'Sign In' : 'Sign Up'"
                align="center">
            <div class="login" v-if="isLogin">
                <login-form/>
                <b-button class="auth-btn float-left" type="button" variant="dark" @click="isLogin = false">
                    To registration
                </b-button>
            </div>
            <div class="register" v-else>
                <register-form @is-login="isLogin = true"/>
                <b-button class="auth-btn float-left" type="button" variant="dark" @click="isLogin = true">
                    To login
                </b-button>
            </div>
        </b-card>
    </div>
</template>

<script>

    import LoginForm from "@/components/Login/LoginForm";
    import RegisterForm from "@/components/Login/RegisterForm";

    export default {
        data() {
            return {
                email: "",
                password: "",
                isLogin: true,
                newUserData: {}
            };
        },
        methods: {
            login: function () {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch("login", {email, password})
                    .then(() => this.$router.push("/"));
            },
            register: function () {
                this.$store.dispatch("register", this.newUserData)
                    .then(() => {
                        this.isLogin = true;
                    });
            }
        },
        components: {
            LoginForm,
            RegisterForm
        }
    };
</script>

<style scoped>
    .auth-card {
        max-width: 30%;
        margin: 0 auto;
    }

    .auth-btn {
        margin-left: 10px;
    }
</style>