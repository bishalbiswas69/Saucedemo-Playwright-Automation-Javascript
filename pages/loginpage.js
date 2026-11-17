class LoginPage{
    constructor(page){
        this.page = page;
        this.baseURL=process.env.BASE_URL;

        //login inputs
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name:'Login'});
    

    }

    async open(){
        console.log('BASE URL:', this.baseURL);

    await this.page.goto(this.baseURL);

    console.log('Current URL:', this.page.url());

    }
    async login(username,password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();


    }
        
} 
module.exports ={LoginPage};
