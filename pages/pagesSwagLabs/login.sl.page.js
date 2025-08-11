const { Actions } = require("../../utils/actions");

let action

export class LoginSlPage {
    constructor(page) {
        this.page = page;
        action = new Actions(this.page);

        //login page
        this.titleSL = this.page.getByText('Swag Labs')
        this.inputUserName = this.page.locator('[data-test="username"]')
        this.inputPwd = this.page.locator('[data-test="password"]')
        this.btnLogin = this.page.locator('[data-test="login-button"]')
        this.headerProducts = this.page.locator('[data-test="title"]')
        //select Item
        this.lblitemBP = this.page.locator('[data-test="item-4-title-link"]')
        this.itemBP = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.iconCart = this.page.locator('[data-test="shopping-cart-link"]')
        this.headerCart = this.page.locator('[data-test="title"]')
        //item description
        this.lblItem = this.page.locator('[data-test="item-4-title-link"]')
        this.btnCheckout = this.page.locator('[data-test="checkout"]')
        this.headerInfo = this.page.locator('[data-test="title"]')
        //info
        this.inputFirstName = this.page.locator('[data-test="firstName"]')
        this.inputLastName = this.page.locator('[data-test="lastName"]')
        this.inputZipCode = this.page.locator('[data-test="postalCode"]')
        this.btnContinue = this.page.locator('[data-test="continue"]')
        this.headerOverview = this.page.locator('[data-test="secondary-header"]')
        // Overview
        this.btnFinish = this.page.locator('[data-test="finish"]')
        this.msgThankYou = this.page.locator('[data-test="complete-header"]')


    }

    async loginScenario(slUsername,slPassword){
        await action.verifyElementTextContains(this.titleSL, "Swag Labs")
        await action.setElementText(this.inputUserName,slUsername)
        await action.setElementText(this.inputPwd,slPassword)
        await action.clickOnElement(this.btnLogin)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.headerProducts, "Products")
    }

    async selectItemScenario(){
        await action.verifyElementTextContains(this.lblitemBP, "Sauce Labs Backpack")
        await action.clickOnElement(this.itemBP)
        await action.clickOnElement(this.iconCart)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.headerCart, "Your Cart")
    }

    async checkoutInformationScenarios(usrName, usrLName, usrCode){
        await action.verifyElementTextContains(this.lblItem, "Sauce Labs Backpack")
        await action.clickOnElement(this.btnCheckout)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.headerInfo, "Checkout: Your Information")
        await action.setElementText(this.inputFirstName,usrName)
        await action.setElementText(this.inputLastName,usrLName)
        await action.setElementText(this.inputZipCode,usrCode)
        await action.clickOnElement(this.btnContinue)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.headerOverview, "Checkout: Overview")

    }

    async checkoutOverviewScenarios(usrName, usrLName, usrCode){
        await action.clickOnElement(this.btnFinish)
        await this.page.waitForLoadState("domcontentloaded")
        await action.verifyElementTextContains(this.msgThankYou, "Thank you for your order!")



    }
}