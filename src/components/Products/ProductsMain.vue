<template>
    <v-container>
        <ProductsError v-if="isError"/>
        <v-expansion-panels v-model="panel"
                            multiple>
            <v-row v-if="!isError">
                <v-col v-for="(name, id) in names"
                       :key="`category-${id}`"
                       cols
                       md="6">

                    <ProductCategory :name="name"
                                     :products="getProducts(id)"
                                     @error="errorMessage = $event"/>
                </v-col>
            </v-row>
        </v-expansion-panels>
        <BasketMain/>
    </v-container>
</template>

<script>
import ProductsError from '@/components/Products/ProductsError.vue';
import ProductCategory from '@/components/Products/Product/ProductCategory.vue';
import BasketMain from '@/components/Products/Basket/BasketMain.vue';

export default {
    name: 'ProductsMain',
    components: {BasketMain, ProductCategory, ProductsError},
    data: () => ({
        data: {},
        names: {},
        isError: true,
        errorMessage: '',
        panel: [],
        interval: 0,
    }),
    async created() {
        await this.init();
        this.panel = Object.keys(this.names).map((k, i) => i);
        this.interval = setInterval(() => {
            this.getUSD();
        }, 3 * 1000);
    },
    methods: {
        async init() {
            await this.getNames();
            await this.getData();
        },
        async getData() {
            this.getUSD();

            const response = await require('/static/data.json');
            this.isError = !response.Success;
            if (this.isError) {
                this.errorMessage = response.Error;
            } else {
                this.data = response.Value.Goods;
            }
        },
        async getNames() {
            const response = await require('/static/names.json');
            this.names = response;
        },
        getUSD() {
            /**
             * Можно было бы решить, как помощью стейта родителя, так и с Vuex.
             * Но, лучше хранить в Vuex, т.к. благодаря ему, родитель не будет перерендироваться,
             * Т.к. в корзине по идеи, товар не должен менят ьсвою цену, в зависимости от курса USD
             */
            this.$store.commit('usd/setUsd', Math.floor(Math.random() * (81 - 20) + 20));
        },
        getProducts(id) {
            return this.data.filter(i => i.G === Number(id));
        },
    },
};
</script>
