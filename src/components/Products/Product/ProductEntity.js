import FieldsEntity from '@/components/Products/FieldsEntity.js';

class ProductEntity extends FieldsEntity {
    id = 0;
    name = 0;
    quantity = 0;
    price = 0;

    constructor({id, name, price, quantity, category}) {
        super();
        this.id = id;
        this.name = name;
        this.category = category;
        if (price) {
            this.price = price;
        }
        if (quantity) {
            this.quantity = quantity;
        }
    }
}

export default ProductEntity;