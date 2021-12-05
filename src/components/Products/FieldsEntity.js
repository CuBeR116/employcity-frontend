class FieldsEntity {
    id = 0;
    name = 0;
    quantity = 0;
    price = 0;
    category = '';

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return (Math.trunc(this.price * 100) / 100);
    }

    getQuantity() {
        return this.quantity;
    }

    isAvailable() {
        return this.price && this.quantity;
    }

    getCategory() {
        return this.category;
    }
}

export default FieldsEntity;