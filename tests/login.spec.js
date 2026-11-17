// @ts-check
const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');
const users = require('../data/users');
const constant = require('../data/constants');

/** @type {LoginPage} */
let loginPage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
})

// test case-1 Login scenario
test('user can login with valid credentials @smoke', async({page}) =>{
  
  await loginPage.login(users.standardUser.username, users.standardUser.password);
  await expect(page).toHaveURL(constant.urls.inventory);
  await expect(page.locator('.title')).toHaveText(constant.text.productTitle);
});


