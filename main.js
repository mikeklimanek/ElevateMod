const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

async function main() {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });

    try {     /* clicks 'AGREE' on cookies first to get rid of the pop up */
    const selector = 'button._a9--._ap36._a9_0';
    const agreeButton = await page.waitForSelector(selector, { timeout: 5000 });
    if (agreeButton) {
      console.log('Accepted cookies');
      await agreeButton.click();
      await page.waitForSelector(selector, { hidden: true, timeout: 5000 });
      console.log('Cookie agreement processed, button disappeared');
    }
    } catch (error) {
        console.log('Cookies AGREE button not found:', error);
    }

    
    const usernameSelector = 'input[name="username"]';
    const passwordSelector = 'input[name="password"]';

    await page.waitForSelector(usernameSelector, { timeout: 5000 });
    await page.type(usernameSelector, process.env.USER_IG);
    await page.type(passwordSelector, process.env.PWD_IG);
    await page.keyboard.press('Enter');


}

main();