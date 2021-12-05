<template>
    <v-row color="secondary">
        <v-col cols
               md="7">
            {{product.getName()}} ({{product.getQuantity()}})
        </v-col>
        <v-col cols="8"
               md="2">
            <v-menu bottom
                    offset-y
                    close-on-content-click>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :color="color"
                           text
                           v-bind="attrs"
                           v-on="on">
                        {{formattedPrice}}
                    </v-btn>
                </template>

                <v-list color="secondary">
                    <v-list-item v-for="(price, index) in priceHistory"
                                 :key="index">
                        <v-list-item-title>{{price}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-col>
        <v-col cols="4"
               md="2">
            <v-btn v-if="!productInBasket"
                   text
                   width="100%"
                   :disabled="!product.isAvailable()"
                   @click="addToBasket">
                <v-icon>$basket</v-icon>
            </v-btn>
            <v-btn v-else
                   text
                   width="100%"
                   @click="deleteFromBasket">
                <v-icon>$checked</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import ProductEntity from '@/components/Products/Product/ProductEntity.js';
import BasketItemEntity from '@/components/Products/Basket/BasketItemEntity.js';

export default {
    name: 'ProductItem',
    props: {
        product: ProductEntity,
        category: String,
    },
    data: () => ({
        prevPrice: 0,
        price: 0,
        unsubscribe: {},
        priceHistory: [],
        historyLength: 5,
        color: 'default',
    }),
    computed: {
        formattedPrice() {
            return this.price.toLocaleString();
        },
        productInBasket() {
            return this.$store.getters['basket/get'](this.product.getId());
        },
    },
    created() {
        this.getPrice();

        if (!this.product.isAvailable()) {
            return;
        }
        this.unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'usd/setUsd') {
                this.getPrice();
            }
        });
    },
    destroyed() {
        this.unsubscribe();
    },
    methods: {
        priceWasDown() {
            this.color = 'success';
            setTimeout(() => {
                this.color = 'default';
            }, 500);
        },
        priceWasUp() {
            this.color = 'error';
            setTimeout(() => {
                this.color = 'default';
            }, 500);
        },
        getPrice() {
            if (this.prevPrice) {
                this.prevPrice = this.price;
                this.priceHistory = [
                    this.price.toLocaleString(),
                    ...this.priceHistory.slice(0, this.historyLength - 1),
                ];
            }
            const price = this.product.getPrice() * this.$store.getters['usd/value'];
            if (!this.prevPrice) {
                this.prevPrice = price;
            }
            price > this.prevPrice ? this.priceWasUp() : this.priceWasDown();

            this.price = price;
        },
        addToBasket() {
            if (!this.product.isAvailable()) {
                return;
            }
            const basketItem = new BasketItemEntity(this.product);

            this.$store.commit('basket/add', basketItem);
        },
        deleteFromBasket() {
            this.$store.commit('basket/delete', this.product.getId());
        },
    },
};
</script>
