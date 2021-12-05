<template>
    <div class="text-right">
        Общая стоимость:
        <v-menu bottom
                offset-y
                :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="success"
                       text
                       v-bind="attrs"
                       v-on="on">{{basketSum}} руб.
                </v-btn>
            </template>

            <v-list color="secondary">
                <BasketSumItem v-for="item in basketItems"
                               :key="item.getId()"
                               :item="item"/>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import BasketSumItem from '@/components/Products/Basket/BasketSumItem.vue';

export default {
    name: 'BasketSum',
    components: {BasketSumItem},
    data: () => ({
        color: 'default',
    }),
    computed: {
        basketItems() {
            return this.$store.getters['basket/basket'];
        },
        basketSum() {
            let sum = 0;

            for (let item of this.$store.getters['basket/basket']) {
                sum += item.getPrice() * item.getUsd() * item.getCount();
            }

            return sum.toLocaleString();
        },
    },
};
</script>
