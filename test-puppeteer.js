const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://e-lproject-l5tv.vercel.app/', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('ROOT HTML:', html.substring(0, 300));
  
  await page.goto('https://e-lproject-l5tv.vercel.app/dashboard', { waitUntil: 'networkidle0' });
  const dashboardHtml = await page.evaluate(() => document.body.innerHTML);
  console.log('DASHBOARD HTML:', dashboardHtml.substring(0, 300));
  await browser.close();
})();
