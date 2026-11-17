
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { Inventory } = require('../pages/Inventory');
const { Cart } = require('../pages/cartpage');
const constants = require('../data/constants');
const users = require('../data/users');

let loginPage;
let inventory;
let cartPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventory = new Inventory(page);
    cartPage = new Cart(page);

    await loginPage.open();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    // Verify successful login
    await expect(page).toHaveURL(/inventory.html/);
});

test('added products looking perfectly in cart', async ({ page }) => {

    await inventory.addProductToCart(
        constants.text.SauceLabsBackPackText
    );

    await inventory.addProductToCart(
        constants.text.SauceLabsBikeLightText
    );

   await cartPage.goToCart();
    console.log('URL after clicking cart:', page.url());
    const itemNames = await cartPage.getAllCartNames();

    expect(itemNames).toEqual([
        constants.text.SauceLabsBackPackText,
        constants.text.SauceLabsBikeLightText
    ]);
});


test('product can be removed from the cart', async ({ page }) => {

    await inventory.addProductToCart(
        constants.text.SauceLabsBackPackText
    );

    await inventory.addProductToCart(
        constants.text.SauceLabsBikeLightText
    );

    await cartPage.goToCart();

    await cartPage.removeProduct(
        constants.text.SauceLabsBackPackText
    );

    const count = await cartPage.getCartItemCount();

    expect(count).toBe(1);

    const remainingNames = await cartPage.getAllCartNames();

    expect(remainingNames).toEqual([
        constants.text.SauceLabsBikeLightText
    ]);
});


test('add a product to the cart and proceed to checkout with correct information', async ({ page }) => {

    await inventory.addProductToCart(
        constants.text.SauceLabsBackPackText
    );

    await cartPage.goToCart();

    await cartPage.clickOnCheckout();

    await cartPage.fillInformation(
        constants.checkoutData.firstName,
        constants.checkoutData.lastName,
        constants.checkoutData.postalCode
    );

    await cartPage.continueToOverview();

    await expect(page).toHaveURL(constants.urls.checkout2url);

    const subtotal = await cartPage.getSubtotal();
    const tax = await cartPage.getTax();
    const total = await cartPage.getTotalPrice();

    expect(total).toBeCloseTo(subtotal + tax, 2);

    await cartPage.clickFinishButton();

    await expect(page).toHaveURL(
        constants.urls.thankYouPageUrl
    );

    await expect(cartPage.getCompleteHeader).toHaveText(
        'Thank you for your order!'
    );

});
