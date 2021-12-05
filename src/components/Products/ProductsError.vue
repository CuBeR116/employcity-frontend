<template>
    <v-snackbar v-model="isShow">
        {{message}}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink"
                   text
                   v-bind="attrs"
                   @click="reloadPage">
                Перезагрузить
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'ProductsError',
    props: {
        message: String,
    },
    data: () => ({
        isShow: false,
    }),
    methods: {
        reloadPage() {
            document.location.reload();
        },
    },
};
</script>
