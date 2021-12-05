<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>{{item.getCategory()}}. {{item.getName()}}</v-list-item-title>
            <v-list-item-subtitle>
                {{priceDetail}}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import BasketItemEntity from '@/components/Products/Basket/BasketItemEntity.js';

export default {
    name: 'BasketSumItem',
    props: {
        item: BasketItemEntity,
    },
    computed: {
        priceDetail() {
            let detail = (this.item.getPrice() * this.item.getUsd()).toLocaleString();
            detail += ` * ${this.item.getCount()} = `;
            let price = (this.item.getPrice() * this.item.getUsd() * this.item.getCount()).toLocaleString();
            detail += `${price} руб`;

            return detail;
        },
    },
};
</script>
