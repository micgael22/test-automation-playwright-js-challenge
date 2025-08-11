import { expect } from "@playwright/test";
const moment = require('moment')
export class Actions {

    constructor(page) {
        this.page = page;
        this.time = ''
        this.pageUrl = ''
        this.webElement = ''
        this.errorJson = ''
    }

    async waitForAnimationEnd(page, selector) {
        return selector
            .evaluate((element) =>
                Promise.all(
                    element
                        .getAnimations()
                        .map((animation) => animation.finished)
                )
            )
    }

    async clickOnElement(locator) {
        try {
            console.log(`=======> Try to clickOnElement <======= ${locator.toString()}`);
            await this.waitForElementToBeVisible(locator)
            await locator.click();
            await this.page.waitForLoadState("load");
        } catch (error) {
            this.webElement  = locator
            this.pageUrl = this.page.url()
            this.errorJson = JSON.stringify(this.webElement)
            this.errorJson = JSON.parse(this.errorJson)
            console.error(
                `
                =======> FAILED to clickOnElement <======= ${locator.toString()}
                =======> ERROR : Unable to clickOnElement after default time <=======
                =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                =======> EXECUTION DETAILS :
                    \t ==> Env      == ${process.env.ENV.toUpperCase()}
                    \t ==> Time     == ${moment()}
                    \t ==> URL      == ${this.pageUrl}
                    
                `, error.message);
        }
    }

    async verifyElementTextContains(locator, expectedValue) {
        try {
            console.log(`=======> Try to verifyElementTextContains <======= ${locator.toString()}`);
            const actualValue = await locator.textContent();
            await this.waitForElementToBeVisible(locator)
            await expect(locator).toContainText(expectedValue);
            console.info(`=======> Test Passed the actual value of element text is : ${actualValue}`)
            console.info(`=======> Test Passed the expect value of element text is : ${expectedValue}`)
        } catch (error) {
            console.error(
                `
                 =======> FAILED : Unable to verifyElementTextContains ${locator.toString()} with text ${expectedValue}
                 =======> ERROR: Unable to locate element after default time <=======
                 =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                 =======> EXECUTION DETAILS :
                    \t ==> Env       == ${process.env.ENV.toUpperCase()}
                    \t ==> Time      == ${moment()}
                    \t ==> URL       == ${this.pageUrl}

                `, error.message);
        }
    }

    async verifyElementVisible(locator) {
        try {
            console.log(`=======> Try to verifyElementVisible <======= ${locator.toString()}`);
            await this.waitForElementToBeVisible(locator)
            await expect(locator).toBeVisible();
        } catch (error) {
            this.webElement  = locator
            this.pageUrl = this.page.url()
            this.errorJson = JSON.stringify(this.webElement)
            this.errorJson = JSON.parse(this.errorJson)
            console.error(
                `
                =======> FAILED to verifyElementVisible ${locator.toString()} not visible <=======
                =======> ERROR : Unable to verifyElementVisible after default time <=======
                =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                =======> EXECUTION DETAILS :
                    \t ==> Env       == ${process.env.ENV.toUpperCase()}
                    \t ==> Time      == ${moment()}
                    \t ==> URL       == ${this.pageUrl}

                `, error.message);
        }
    }

    async waitForElementToBeVisible(locator){
        try {
        console.log(`=======> Try to waitForElementToBeVisible <======= ${locator.toString()}`);
        const isDisplayed = await locator.isVisible();
        if (isDisplayed === false) {
           await locator.scrollIntoViewIfNeeded({behavior: 'smooth', block: 'end', inline: 'nearest'});
        }
        await this.waitForAnimationEnd(this.page, locator)
        await locator.waitFor({state:'visible',timeout:10000})

        } catch (error) {
            console.error(`Element ${locator.toString()} is not visible`, error.message);
            console.error(
                `
                =======> FAILED to waitForElementToBeVisible ${locator.toString()} is not visible
                =======> ERROR : Unable to waitForElementToBeVisible after default time <=======
                =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                =======> EXECUTION DETAILS:
                    \t ==> Env       == ${process.env.ENV.toUpperCase()}
                    \t ==> Time      == ${moment()}
                    \t ==> URL       == ${this.pageUrl}

                `, error.message);
        }
    }

    async setElementText(locator, text) {
        try {
            console.log(`=======> Try to setElementText <======= ${locator.toString()}`);
            await this.waitForElementToBeVisible(locator)
            await locator.fill(text);
        } catch (error) {
            this.webElement  = locator
            this.pageUrl = this.page.url()
            this.errorJson = JSON.stringify(this.webElement)
            this.errorJson = JSON.parse(this.errorJson)
            console.error(
                `
                =======> FAILED : Unable to setElementText ${locator.toString()} with text ${text}
                =======> ERROR : Unable to locate element after default time <=======
                =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                =======> EXECUTION DETAILS :
                    \t ==> Env       == ${process.env.ENV.toUpperCase()}
                    \t ==> Time      == ${moment()}
                    \t ==> URL       == ${this.pageUrl}
                    
                `, error.message);
        }
    }

    async verifyElementTextEquals(locator, expectedValue) {
        try {
            console.log(`=======> Try to verifyElementTextEquals <======= ${locator.toString()}`);
            const actualValue = await locator.textContent();
            await this.waitForElementToBeVisible(locator)
            await expect(locator).toHaveText(expectedValue);
            console.info(`=======> Test Passed the actual value of element text is : ${actualValue}`)
            console.info(`=======> Test Passed the expect value of element text is : ${expectedValue}`)
        }catch (error) {
            console.error(
                `
                 =======> FAILED : Unable to verifyElementTextContains ${locator.toString()} with text ${expectedValue}
                 =======> ERROR : Unable to locate element after default time <=======
                 =======> PLEASE FIND THE ERROR ASSOCIATED : ${error}
                 =======> EXECUTION DETAILS :
                    \t ==> Env       == ${process.env.ENV.toUpperCase()}
                    \t ==> Time      == ${moment()}
                    \t ==> URL       == ${this.pageUrl}

                `, error.message);
        }
    }

    async verifyTextVisible(roleType, roleName) {
        await expect(this.page.getByRole(roleType, { name: roleName })).toBeVisible();
    }

    async navigateTo(siteName) {
        await this.page.goto(siteName, { waitUntil: "commit" });
        await this.page.waitForLoadState("domcontentloaded");

    }

}
