<template>
    <b-row v-if="cards.length">
        <b-col :key="card.number" xl="3" lg="4" md="6" sm="6" class="mt-3" v-for="card in cards">
            <b-card class="text-center m-auto card-item">
                <div class="bank-name float-left">BankName</div>
                <b-button size="sm" variant="danger" class="float-right" v-b-tooltip.hover
                          @click="onDelete(card.id)"
                          title="Remove credit card">
                    <font-awesome-icon icon="trash"/>
                </b-button>
                <br>
                <div class="card-number">{{cc_format(card.number)}}</div>
                <div class="user-name float-left">{{userData.full_name}}</div>
                <div class="expired_at floar-right">{{card.expired_at}}</div>
            </b-card>
        </b-col>
        <confirm-modal @hidden="confirmShow = false" @onOk="removeCard"
                       :text="`Are you sure that you want remove this card?`" v-if="confirmShow"/>
    </b-row>
</template>

<script>
    import mixins from "@/mixins";
    import {mapGetters} from "vuex";
    import ConfirmModal from "@/modals/ConfirmModal";
    import {ENDPOINTS} from "@/api";

    export default {
        mixins: [mixins],
        props: {
            cards: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                confirmShow: false,
                selectedCardId: null
            };
        },
        computed: {
            ...mapGetters([
                "userData"
            ])
        },
        methods: {
            onDelete(cardId) {
                this.confirmShow = true;
                this.selectedCardId = cardId;
            },
            removeCard(ev) {
                ev.preventDefault();
                this.$http.delete(ENDPOINTS.CARDS + "/" + this.selectedCardId)
                    .then(resp => {
                        if (resp.success) {
                            this.confirmShow = false;
                            this.$emit("on-delete", this.selectedCardId);
                            this.$toastr("success", "Successfully deleted");
                        }
                    });
            },
        },
        components: {
            ConfirmModal,
        }
    };
</script>

<style lang="scss" scoped>
    .card-item {
        width: 100%;
        height: 220px;

        .card-number {
            margin-top: 50px;
            margin-bottom: 10px;
        }
    }
</style>