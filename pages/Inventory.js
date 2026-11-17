
class Inventory {
    constructor(page) {
        this.page = page;

        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    getProductCard(productName) {
        return this.inventoryItems.filter({
            has: this.page.getByRole('button', {
                name: `View details for ${productName}`
            })
        });
    }

    async addProductToCart(productName) {
        const product = this.getProductCard(productName);

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }

    async getCartCount() {
        const hasBadge = await this.cartBadge.count();

        if (hasBadge === 0) return 0;

        const badgeText = await this.cartBadge.textContent();

        return Number(badgeText);
    }

    async sortBy(optionValue) {
        await this.sortDropDown.selectOption(optionValue);
    }

    async getAllProductPrices() {
        const priceText = await this.itemPrices.allTextContents();

        return priceText.map(p => parseFloat(p.replace('$', '')));
    }
}

module.exports = { Inventory };
