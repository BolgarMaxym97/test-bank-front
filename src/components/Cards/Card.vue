<template>
    <b-card class="text-center m-auto card-item">
        <div class="bank-name float-left">BankName</div>
        <b-button size="sm" variant="danger" class="float-right" v-b-tooltip.hover
                  @click="confirmShow = true"
                  title="Remove credit card">
            <font-awesome-icon icon="trash"/>
        </b-button>
        <br>
        <div class="card-number">{{cc_format(card.number)}}</div>
        <div class="user-name float-left">{{userData.full_name}}</div>
        <div class="expired_at float-right">{{card.expired_at}}</div>

        <div class="mt-5">
            <b-button size="sm" variant="primary" class="float-left" v-b-tooltip.hover
                      @click="infoModalShow = true"
                      title="Info about card and operations">
                <font-awesome-icon icon="info"/>
            </b-button>

            <b-button size="sm" variant="success" class="float-right" v-b-tooltip.hover
                      @click="operationModalShow = true"
                      title="Make operation">
                <font-awesome-icon icon="money-bill"/>
            </b-button>
        </div>
        <operations-modal :card="card" @hidden="operationModalShow = false"
                          v-if="operationModalShow"></operations-modal>
        <info-modal :card="card" @hidden="infoModalShow = false"
                    v-if="infoModalShow"></info-modal>
        <confirm-modal @hidden="confirmShow = false" @onOk="removeCard"
                       :text="`Aconfirm-modal @h you want remove this card?`" v-if="confirmShow"/>
    </b-card>
</template>

<script>
    import mixins from "@/mixins";
    import {mapGetters} from "vuex";
    import {ENDPOINTS} from "@/api";
    import OperationsModal from "@/modals/OperationsModal";
    import InfoModal from "@/modals/InfoModal";
    import ConfirmModal from "@/modals/ConfirmModal";

    export default {
        mixins: [mixins],
        props: {
            card: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                infoModalShow: false,
                operationModalShow: false,
                confirmShow: false,
            };
        },
        computed: {
            ...mapGetters([
                "userData"
            ])
        },
        methods: {
            removeCard(ev) {
                ev.preventDefault();
                this.$http.delete(ENDPOINTS.CARDS + "/" + this.card.id)
                    .then(resp => {
                        if (resp.success) {
                            this.confirmShow = false;
                            this.$emit("on-delete", this.card.id);
                            this.$toastr("success", "Successfully deleted");
                        }
                    });
            },
        },
        components: {
            OperationsModal,
            ConfirmModal,
            InfoModal,
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