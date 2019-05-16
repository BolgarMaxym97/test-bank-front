<template>
    <b-modal :visible="true"
             title="Operations history"
             size="lg"
             ref="modal"
             cancel-title="Close"
             ok-variant="success"
             @hidden="onHidden">
        <h2 class="float-left">Current balance: {{card.amount}}</h2>
        <table class="table mt-4" v-if="card.operations && card.operations.length">
            <thead>
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Is success?</th>
                <th scope="col">Transfer to</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="operation.id" v-for="operation in card.operations">
                <td>{{operation.type_name}}</td>
                <td>{{operation.amount}}</td>
                <td>{{String(operation.is_success).toUpperCase()}}</td>
                <td>{{operation.additional_info || "---"}}</td>
                <td>{{operation.created_at}}</td>
            </tr>
            </tbody>
        </table>
        <div class="mt-5" v-else>There is no operations yet</div>
    </b-modal>
</template>

<script>
    export default {
        props: {
            card: {
                type: Object,
                required: true
            }
        },
        methods: {
            onHidden() {
                this.$emit("hidden");
            },
        }
    };
</script>

<style lang="scss" scoped>

</style>