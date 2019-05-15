<template>
    <b-modal :visible="true"
             title="New credit card"
             size="sm"
             ref="modal"
             ok-title="Save"
             cancel-title="Cancel"
             ok-variant="success"
             :ok-disabled="loading"
             :no-close-on-backdrop="true"
             @ok="createCard"
             @hidden="onHidden">
        <b-row>
            <b-col xl="12" lg="12" md="12">
                <b-form-group
                        v-for="input in inputFields"
                        :key="input.name"
                        :label="input.label"
                        :label-for="input.name"
                        class="text-left"
                        :description="`Please enter your ${input.label.toLowerCase()}`">
                    <b-form-input
                            :id="input.name"
                            :type="input.type"
                            @input="handleChange($event, input.name)"
                            maxlength="4"
                            required
                            :disabled="loading"
                            :placeholder="`Enter ${input.label.toLowerCase()}`">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";

    export default {
        props: {},
        data() {
            return {
                loading: false,
                cardData: {
                    number: null,
                    user_id: null,
                    pin: null,
                    pin_confirmation: null,
                },
                inputFields: [
                    {
                        name: "pin",
                        label: "Pin code",
                        type: "password",
                        desc: "Please enter your pin code (4 symbols)"
                    },
                    {
                        name: "pin_confirmation",
                        label: "Pin code confirmation",
                        type: "password",
                        desc: "Please confirm your pin code"
                    },
                ],

            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createCard(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.post(ENDPOINTS.CARDS, this.cardData).then(resp => {
                    this.loading = false;
                    this.$refs.modal.hide();
                    this.$emit("card-added", resp);
                });
            },
            handleChange(value, name) {
                this.cardData[name] = value;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 90px;
    }

</style>