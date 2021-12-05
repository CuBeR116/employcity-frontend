<template>
    <div>
        <h2>Корзина</h2>
        <v-sheet class="mt-15"
                 v-show="items.length">
            <v-col cols="12" class="d-none d-md-flex">
                <v-row>
                    <v-col cols="6">Наименование товара и описание</v-col>
                    <v-col cols="2">Количество</v-col>
                    <v-col cols="4">Цена</v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <BasketProductItem v-for="item in items"
                                   :key="item.getId()"
                                   :item="item"/>
            </v-col>
            <v-col>
                <BasketSum />
            </v-col>
        </v-sheet>
        <div v-show="!items.length">Корзина пуста</div>
    </div>
</template>

<script>
import BasketProductItem from '@/components/Products/Basket/BasketProductItem.vue';
import BasketSum from '@/components/Products/Basket/BasketSum.vue';

export default {
    name: 'BasketMain',
    components: {BasketSum, BasketProductItem},
    computed: {
        items() {
            return this.$store.getters['basket/basket'];
        },
    },
};
</script>
