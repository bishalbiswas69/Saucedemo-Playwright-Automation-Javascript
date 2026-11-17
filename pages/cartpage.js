
class Cart {
    constructor(page) {
        this.page = page;

        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = this.cartItems.locator('.inventory_item_name');

        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');

        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');

        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.getCompleteHeader = page.locator('[data-test="complete-header"]');
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('**/cart.html');
    }

    async getAllCartNames() {
        await this.cartItems.first().waitFor();
        return await this.itemNames.allTextContents();
    }

    getCartItem(productName) {
        return this.cartItems.filter({ hasText: productName });
    }

    async removeProduct(productName) {
        const item = this.getCartItem(productName);
        await item.getByRole('button', { name: /remove/i }).click();
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async getSubtotal() {
        const text = await this.subtotal.textContent();
        return parseFloat(text.replace('Item total: $', ''));
    }

    async getTax() {
        const text = await this.tax.textContent();
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotalPrice() {
        const text = await this.totalPrice.textContent();
        return parseFloat(text.replace('Total: $', ''));
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}

module.exports = { Cart };
