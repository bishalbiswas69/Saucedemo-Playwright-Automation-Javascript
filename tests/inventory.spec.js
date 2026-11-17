
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

    // FIX 5: Login before accessing inventory
    await loginpage.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('cart badge updates when adding products', async () => {

    inventory.addProductToCart(constants.text.SauceLabsBackPackText);
    inventory.addProductToCart(constants.text.SauceLabsBikeLightText);

    const cartCount = await inventory.getCartCount();

    expect(cartCount).toBe(2);
});

test('products can be sorted by price low to high', async () => {

    await inventory.sortBy(constants.SortOptions.priceLowToHigh);

    const prices = await inventory.getAllProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});
