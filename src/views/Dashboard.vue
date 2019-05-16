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
            <div v-if="cards.length">
                <cards :cards="cards" @on-delete="afterCardRemoving"/>
            </div>
            <div v-else class="">There is no cards</div>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "@/api";
    import {mapGetters} from "vuex";
    import _ from "lodash";
    import NewCreditCard from "@/modals/NewCreditCard";
    import Cards from "@/components/Cards/Cards";
    import EventBus from "@/event-bus";

    export default {
        data() {
            return {
                loading: true,
                cards: [],
                createCard: false
            };
        },

        mounted() {
            this.fetch(this.userData.id);
            EventBus.$on("cards-fetch", (user_id) => {
                this.fetch(user_id);
            });
        },

        methods: {
            afterCardAdded(payload) {
                if (_.size(payload)) {
                    this.cards.push(payload);
                }
            },

            afterCardRemoving(cardId) {
                const index = this.cards.findIndex(card => {
                    return card.id === cardId;
                });
                if (index !== -1) {
                    this.cards.splice(index, 1);
                }
            },

            fetch(user_id) {
                this.$http.get(ENDPOINTS.CARDS + "/" + user_id)
                    .then(resp => {
                        this.cards = resp.cards;
                        this.loading = false;
                    });
            }
        },

        components: {
            NewCreditCard,
            Cards
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
    }

    .loader {
        color: $primary-color-5;
        font-size: 48px;
    }
</style>

