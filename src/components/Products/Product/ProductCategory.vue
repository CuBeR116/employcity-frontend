<template>
    <v-expansion-panel>
        <v-expansion-panel-header>

            <template v-slot:actions>
                <v-icon>
                    $arrow-down
                </v-icon>
            </template>

            {{name.G}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row>
                <v-col v-for="(product, index) in name.B"
                       :key="index"
                       lg="6"
                       cols>
                    <ProductItem :product="getProductEntity(index)"
                                 :category="name.G"/>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import ProductItem from '@/components/Products/Product/ProductItem.vue';
import ProductEntity from '@/components/Products/Product/ProductEntity.js';

export default {
    name: 'ProductCategory',
    components: {ProductItem},
    props: {
        name: Object,
        products: Array,
    },
    methods: {
        getProductEntity(index) {
            const product = this.name.B[index];
            const info = this.products.find(i => i.T === Number(index));
            const productParams = {
                id: index,
                name: product.N,
                category: this.name.G,
            };
            if (info) {
                productParams.price = info.C;
                productParams.quantity = info.P;
            }

            return new ProductEntity(productParams);
        },
    },
};
</script>
