<template>
    <div class="dashboard">
        <font-awesome-icon v-if="loading" icon="spinner" class="loader"/>
        <div class="" v-else>
            <h2 class="">Credit cards</h2>
            <b-button variant="success" class="mt-1 mb-2" v-b-tooltip.hover
                      @click="createCard = true"
                      title="Add credit card">
                Add
            </b-button>
            <new-credit-card @card-added="afterCardAdded" v-if="createCard" @hidden="createCard = false"/>
            <b-row v-if="cards.length">
                <b-col :key="card.number" xl="3" lg="3" md="3" class="mt-3" v-for="card in cards">
                    <b-card class="text-center m-auto card-item">
                        <div class="bank-name float-left">BankName</div>
                        <br>
                        <div class="card-number">{{cc_format(card.number)}}</div>
                        <div class="user-name float-left">{{userData.full_name}}</div>
                        <div class="expired_at floar-right">{{card.expired_at}}</div>
                    </b-card>
                </b-col>
            </b-row>
            <div v-else class="">There is no cards</div>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import {mapGetters} from "vuex";
    import _ from "lodash";
    import NewCreditCard from "@/modals/NewCreditCard";
    import mixins from "@/mixins";

    export default {
        mixins: [mixins],
        data() {
            return {
                loading: true,
                cards: [],
                createCard: false
            };
        },

        mounted() {
            this.$http.get(ENDPOINTS.CARDS + "/" + _.get(this.userData, "id"))
                .then(resp => {
                    this.cards = resp.cards;
                    this.loading = false;
                });
        },

        methods: {
            afterCardAdded(payload) {
                if (_.size(payload)) {
                    this.cards.push(payload);
                }
            },
        },

        components: {
            NewCreditCard
        },

        computed: {
            ...mapGetters([
                "userData"
            ])
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .dashboard {
        padding: 2%;

        .card-item {
            width: 100%;
            height: 220px;

            .card-number {
                margin-top: 50px;
                margin-bottom: 10px;
            }
        }
    }

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }
</style>

