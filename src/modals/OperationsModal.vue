<template>
    <b-modal :visible="true"
             :title="`Balance: ${card.amount}`"
             size="md"
             ref="modal"
             ok-title="Create"
             cancel-title="Cancel"
             ok-variant="success"
             :ok-disabled="loading || !operationData.pin || (operationData.pin && operationData.pin.length < 4)"
             :no-close-on-backdrop="true"
             @ok="createOperation"
             @hidden="onHidden">
        <b-row>
            <b-col xl="12" lg="12" md="12">
                <label for="operation_type_id" class="float-left">Select operation type</label>
                <b-form-select v-model="operationData.operation_type_id" :options="types" id="operation_type_id"></b-form-select>

                <b-form-group
                        v-if="operationData.operation_type_id === 3"
                        label="Credit Card Number"
                        label-for="card_number"
                        class="text-left mt-2"
                        description="Please enter credit card number">
                    <b-form-input
                            id="card_number"
                            type="text"
                            required
                            :disabled="loading"
                            v-model="operationData.card_number"
                            placeholder="Enter credit card number">
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        label="Amount"
                        label-for="amount"
                        class="text-left mt-2"
                        description="Please enter amount">
                    <b-form-input
                            id="amount"
                            type="text"
                            required
                            :disabled="loading"
                            v-model="operationData.amount"
                            placeholder="Enter amount">
                    </b-form-input>
                </b-form-group>
                <b-form-group
                        label="Pin code"
                        label-for="pin"
                        class="text-left mt-2"
                        description="Please enter your pin code">
                    <b-form-input
                            id="pin"
                            type="password"
                            required
                            maxlength="4"
                            :disabled="loading"
                            v-model="operationData.pin"
                            placeholder="Enter your pin code">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import EventBus from "@/event-bus";
    import Vue from "vue";
    import _ from "lodash";

    export default {
        props: {
            card: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                operationData: {
                    operation_type_id: 1,
                    amount: 0,
                    card_number: null,
                    card_id: this.card.id,
                    pin: null,
                },
                types: [
                    {value: 1, text: "Cash withdrawal"},
                    {value: 2, text: "Credit card replenishment"},
                    {value: 3, text: "Transfer money from card to card"},
                ]

            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            createOperation(ev) {
                ev.preventDefault();
                this.loading = true;
                this.$http.post(ENDPOINTS.OPERATIONS, this.operationData).then(resp => {
                    this.loading = false;
                    if (_.get(resp, "success")) {
                        EventBus.$emit("cards-fetch");
                        this.$refs.modal.hide();
                    } else {
                        Vue.prototype.$toastr("error", "Error", "Wrong data or not enough money");
                    }
                });
            },
            handleChange(value, name) {
                this.operationData[name] = value;
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