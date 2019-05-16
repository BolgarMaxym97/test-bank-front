<template>
    <b-form class="registration" @submit.prevent="register">
        <b-form-group id="nameFirstInputGroup"
                      label="First name:"
                      label-for="name_first">
            <b-form-input id="name_first"
                          type="text"
                          v-model="newUserData.name_first"
                          required
                          placeholder="Enter your first name">
            </b-form-input>
        </b-form-group>

        <b-form-group id="nameLastInputGroup"
                      label="Last name:"
                      label-for="name_last">
            <b-form-input id="name_last"
                          type="text"
                          v-model="newUserData.name_last"
                          required
                          placeholder="Enter your last name">
            </b-form-input>
        </b-form-group>

        <b-form-group id="phoneInputGroup"
                      label="Phone name:"
                      label-for="phone">
            <b-form-input id="phone"
                          type="text"
                          v-model="newUserData.phone"
                          required
                          placeholder="Enter your phone number">
            </b-form-input>
        </b-form-group>

        <b-form-group id="emailInputGroup"
                      label="Email address:"
                      label-for="email">
            <b-form-input id="email"
                          type="email"
                          v-model="newUserData.email"
                          required
                          placeholder="Enter email">
            </b-form-input>
        </b-form-group>

        <b-form-group id="passwordInputGroup"
                      label="Password:"
                      label-for="password">
            <b-form-input id="password"
                          type="password"
                          v-model="newUserData.password"
                          required
                          placeholder="Enter password">
            </b-form-input>
        </b-form-group>
        <b-form-group id="passwordConfirmInputGroup"
                      label="Confirm your password:"
                      label-for="password">
            <b-form-input id="password_confirmation"
                          type="password"
                          v-model="newUserData.password_confirmation"
                          required
                          placeholder="Confirm your password">
            </b-form-input>
        </b-form-group>

        <b-button class="auth-btn float-right" type="submit" variant="primary">
            <font-awesome-icon icon="sign-in-alt"/>
            Register
        </b-button>
    </b-form>
</template>

<script>

    export default {
        data() {
            return {
                newUserData: {
                    name_first: null,
                    name_last: null,
                    phone: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                }
            };
        },
        methods: {
            register: function () {
                this.$store.dispatch("register", this.newUserData)
                    .then(() => this.$emit("is-login"));
            }
        }
    };
</script>

<style scoped>

    .auth-btn {
        margin-left: 10px;
    }
</style>