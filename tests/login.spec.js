const{test,expect}=require('@playwright/test');
const{LoginPage}=require('../pages/loginpage');
const users= require('../data/users');
const constants = require('../data/constants');


let loginpage;
test.beforeEach(async({page})=>{
    loginpage = new LoginPage(page);
    await loginpage.open();

})

test('user can login with valid credentials @smoke',async({page})=>{

    
   await loginpage.login(users.standardUser.username,users.standardUser.password);
    await expect(page).toHaveURL(constants.urls.inventory);
    await expect(page.locator('.title')).toHaveText(constants.text.productTitle);

});
