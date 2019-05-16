<template>
    <b-row v-if="cards.length">
        <b-col :key="card.number" xl="3" lg="4" md="6" sm="6" class="mt-3" v-for="card in cards">
            <card @on-delete="afterCardRemoving" :card="card"/>
        </b-col>
    </b-row>
</template>

<script>
    import Card from "@/components/Cards/Card";

    export default {
        props: {
            cards: {
                type: Array,
                required: true
            }
        },
        methods: {
            afterCardRemoving(cardId) {
                this.$emit("on-delete", cardId);
            },
        },
        components: {
            Card
        }
    };
</script>

<style lang="scss" scoped>

</style>