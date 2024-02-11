const puppeteer = require('puppeteer');
const fs = require('fs');


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
    }
    } catch (error) {
        console.log('Cookies AGREE button not found:', error);
    }
}

main();