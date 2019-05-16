<template>
    <b-modal :visible="true"
             :title="title"
             v-b-modal.modalsm
             ref="modal"
             ok-title="Yes"
             cancel-title="No"
             ok-variant="success"
             :cancel-disabled="loading"
             :ok-disabled="loading"
             @hidden="onHidden"
             @ok="ok">
        <span v-html="text"></span>
    </b-modal>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: "Are you sure?"
            },
            text: {
                type: String,
                default: "Are you sure that you want to do this?"
            }
        },
        data() {
            return {
                loading: false
            };
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
            ok(ev) {
                this.loading = true;
                this.$emit("onOk", ev);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/colors";

    .loader {
        color: $primary-color-5;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 64px;
    }
</style>