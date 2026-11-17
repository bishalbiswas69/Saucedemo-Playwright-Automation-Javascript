
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { Inventory } = require('../pages/Inventory');
const constants = require('../data/constants');
const users = require('../data/users');

let loginpage;
let inventory;

test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    inventory = new Inventory(page);

    await loginpage.open();

    await loginpage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    // Verify successful login
    await expect(page).toHaveURL(/inventory.html/);
});

test('cart badge updates when adding products', async () => {
    await inventory.addProductToCart(
        constants.text.SauceLabsBackPackText
    );

    await inventory.addProductToCart(
        constants.text.SauceLabsBikeLightText
    );

    const cartCount = await inventory.getCartCount();

    expect(cartCount).toBe(2);
});

test('products can be sorted by price low to high', async () => {
    await inventory.sortBy(constants.sortOptions.priceLowToHigh);

    const prices = await inventory.getAllProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});
