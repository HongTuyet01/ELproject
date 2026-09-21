const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('https://e-lproject-l5tv.vercel.app/dashboard', { waitUntil: 'networkidle0' });
  console.log('Navigated to dashboard');
  
  // Click on the garden card
  await page.click('h3.line-clamp-2');
  console.log('Clicked garden card');
  
  // Wait a bit for animation
  await new Promise(r => setTimeout(r, 1000));
  
  const html = await page.evaluate(() => document.querySelector('main').innerHTML);
  console.log('MAIN HTML AFTER CLICK:', html.substring(0, 500));
  await browser.close();
})();
