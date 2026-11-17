class Cart {
    constructor(page) {
        this.cartLink = page.locator('[data-text="shopping-cart-badge"]');
        this.itemNames = page.locator('[data-text="inventory-item-name"]');
        this.cartItems = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.getByRole('button',{name:'Continue'});
        this.subtotal=page.locator('[data-test="subtotal-label"]');
        this.tax=page.locator('[data-test="tax-label"]');
        this.totalPrice=page.locator('[data-test="total-label"]');
        this.finishButton = page.getByRole('button',{name:'Finish'});
        this.getCompleteHeaderButton=page.locator('[data-test="complete-header"]');


    }
    async goToCart() {
        await this.cartLink.click();
    }

    async getAllCartNames() {
        return await this.itemNames.allTestContents();
    }

    async removeProduct(productName) {
        const item = this.getCartItem(productName);
        await item.getByRole('button', { name: 'remove' }).click();

    }

    getCartItem(productName) {

        return this.cartItem.filter({ hasText: productName });

    }

    getCartItemCount() {
        return this.cartItem.count();
    }

     async clickOnCheckout() {
        inventory.addProductToCart(constants.text.SauceLabsBackPackText);
        inventory.addProductToCart(constants.text.SauceLabsBikeLightText);
        await this.checkoutButton.click();
    }

    async fillInformation(firstName,lastName,postalCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
       
    }

    async continueToOverview(){
        await this.continueButton.click();
    }

    async getSubtotal(){
        const text = await this.subtotal.textContent();
        return parseFloat(text.replace('Item total: $',''));


    }
     async getTax(){
        const text= await this.tax.textContent();
        return parseFloat(text.replace('Tax: $',''));
        

    }
     async getTotalPrice(){
         const text = await this.totalPrice.textContent();
        return parseFloat(text.replace('Total: $',''));
        

    }

    async clickFinishButton(){
        await this.finishButton().click();

    }

  

}


module.exports = { Cart };