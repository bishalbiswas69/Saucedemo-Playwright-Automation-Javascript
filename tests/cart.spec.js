const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { Inventory } = require('../pages/Inventory');
const { cart } = require('../pages/cartpage');
const constants = require('../data/constants');


let loginpage;

let inventory;

let cart;


test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    inventory = new Inventory(page);
    await loginpage.open();
    await loginpage.login(users.standardUser.username, users.standardUser.password);

});

test('added products looking perfectly in cart', async ({ page }) => {
    inventory.addProductToCart(constants.text.SauceLabsBackPackText);
    inventory.addProductToCart(constants.text.SauceLabsBikeLightText);
    await this.cart.goToCart();
    await expect(page).toHaveURL(Constants.urls.cart)
    const itemName = await cart.getAllCartNames()
    expect(itemNames).toEqual([constants.text.SauceLabsBackPackText, constants.text.SauceLabsBikeLightText])
})

test('product  can be removed from the cart', async ({ page }) => {
    await this.cart.goToCart();
    await cart.removeProduct(test.SauceLabsBackPackText);
    const count = cart.getCartItemCount();
    expect(count).toBe(1);
    const remainingNames = await cart.getAllCartNames();
    expect(remainingNames).toEqual(constants.text.SauceLabsBikeLightText);
})

test('add a product to the cart and head to checkout and user can proceed with right info', async ({ page }) => {
    cart.clickOnCheckout();
    cart.fillInformation(constants.checkoutData.firstName, constants.checkoutData.lastName,constants.checkoutData.postalCode);
    cart.continueToOverview();
    await expect(page).toHaveURL(constants.urls.checkout2url);
    const subtotal= await cart.getSubtotal();
    const tax = await cart.getTax();
    const total = await cart.getTotalPrice();
    expect(total).toBeCloseTo(subtotal + tax,2);
    cart.clickFinishButton();
    await expect(page).toHaveURL(constants.urls.thankYouPageUrl);
    await  expect(cart.getCompleteHeaderButton).toHaveText('Thank you for your order!');




})



