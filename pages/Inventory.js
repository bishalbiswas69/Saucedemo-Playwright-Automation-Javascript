
class Inventory {
    constructor(page) {
        this.page = page;

        this.inventoryItems = page.locator('[data-test="inventory_item"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');

        // FIX 1: Added missing dot to the CSS class selector
        this.itemPrices = page.locator('.inventory_item_price');
    }

    getProductCard(productName) {
        return this.inventoryItems.filter({ hasText: productName });
    }

    async addProductToCart(productName) {

        // FIX 2: ProductName changed to productName
        const product = this.getProductCard(productName);

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount() {
        const hasBadge = await this.cartBadge.count();

        if (hasBadge === 0) return 0;

        // FIX 3: Corrected TextContent() to textContent()
        const badgeText = await this.cartBadge.textContent();

        return parseInt(badgeText, 10);
    }

    // FIX 4: sortBy only performs sorting
    async sortBy(optionValue) {
        await this.sortDropDown.selectOption(optionValue);
    }

    async getAllProductPrices() {
        const priceText = await this.itemPrices.allTextContents();

        return priceText.map((p) => parseFloat(p.replace('$', '')));
    }
}

module.exports = { Inventory };
