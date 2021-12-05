<template>
    <v-row>
        <v-col cols
               md="6">{{item.getCategory()}}. {{item.getName()}}
        </v-col>
        <v-col cols
               md="2">
            <v-text-field v-model="quantity"
                          @change="checkQuantity"
                          label="шт"
                          hide-details
                          :max="quantity"
                          :min="1"
                          type="number"/>
            <v-alert v-show="maxQuantity <= 5"
                     text
                     align="left"
                     icon="$warning"
                     type="warning">Количество ограничено
            </v-alert>
        </v-col>
        <v-col cols="12"
               md="2"
               class="text-center text-md-left"><strong>{{priceFormatted}} руб.</strong>/шт
        </v-col>
        <v-col cols="12" md="2">
            <v-btn text
                   color="error"
                   @click="deleteFromBasket"
                   width="100%">Удалить
            </v-btn>
        </v-col>

        <v-snackbar v-if="snackbar"
                    v-model="snackbar"
                    multi-line>
            Количество товара было изменено на {{quantity}}

            <template v-slot:action="{ attrs }">
                <v-btn color="red"
                       text
                       v-bind="attrs"
                       @click="snackbar = false">
                    Закрыть
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>

<script>
import BasketItemEntity from '@/components/Products/Basket/BasketItemEntity.js';

export default {
    name: 'BasketProductItem',
    props: {
        item: BasketItemEntity,
    },
    data: () => ({
        quantity: 0,
        maxQuantity: 0,
        warningCount: 5,
        //snakebar работает через v-model, о использовать v-if, тобы при большом количестве товара, не был оутечки памяти
        snackbar: false,
    }),
    computed: {
        priceFormatted() {
            return (this.item.getPrice() * this.item.getUsd()).toLocaleString();
        },
    },
    created() {
        this.quantity = this.item.getCount();
        this.maxQuantity = this.item.getQuantity();
    },
    methods: {
        deleteFromBasket() {
            this.$store.commit('basket/delete', this.item.getId());
        },
        checkQuantity() {
            if (this.quantity > this.maxQuantity) {
                this.quantity = this.maxQuantity;
                this.snackbar = true;
            }
            if (this.quantity < 1) {
                this.quantity = 1;
                this.snackbar = true;
            }

            this.item.setCount(this.quantity);
        },
    },
};
</script>
