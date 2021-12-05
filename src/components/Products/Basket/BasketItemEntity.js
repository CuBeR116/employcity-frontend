import FieldsEntity from '@/components/Products/FieldsEntity.js';
import {store} from '@/store';

class BasketItemEntity extends FieldsEntity {
    count = 1;
    usd = 0;

    constructor(productEntity) {
        super();
        if (!productEntity.isAvailable()) {
            console.error('Товар недоступен');
            return;
        }

        this.id = productEntity.getId();
        this.name = productEntity.getName();
        this.price = productEntity.getPrice();
        this.quantity = productEntity.getQuantity();
        this.category = productEntity.getCategory();
        this.usd = store.getters['usd/value'];
    }

    setCount(value) {
        this.count = value;
    }

    getCount() {
        return this.count;
    }

    getUsd() {
        return this.usd;
    }
}

export default BasketItemEntity;