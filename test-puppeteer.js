const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('https://e-lproject-l5tv.vercel.app/dashboard', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.querySelector('main').innerHTML);
  console.log('MAIN HTML CONTENT:', html);
  await browser.close();
})();
