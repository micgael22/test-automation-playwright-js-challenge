// @ts-check
const { test, expect } = require('@playwright/test');
const {Actions} = require('../../utils/actions');
const {LoginSlPage} = require('../../pages/pagesSwaglabs/login.sl.page');

let action
let slLogin, slUsername, slPwd

test.describe('Verify that user can login successfully',()=>{
    test.beforeEach(async({page})=>{
        action = new Actions(page)
        slLogin = new LoginSlPage(page)
        slUsername = process.env.USERNAME_A
        slPwd = process.env.PWD_A
    })

    test('Verify user can login valid details ', async ({ page }) => {
        await test.step("Login", async()=> {
            await action.navigateTo(process.env.WEBURL_SW);
            await page.waitForLoadState("domcontentloaded")
            await slLogin.loginScenario(slUsername, slPwd)
            await slLogin.selectItemScenario()
            await slLogin.checkoutInformationScenarios("Demo", "test", "1785")
            await slLogin.checkoutOverviewScenarios()

        })
    });



})
