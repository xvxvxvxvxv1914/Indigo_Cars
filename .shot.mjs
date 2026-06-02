import { chromium } from 'playwright';

const url = 'http://localhost:5173/';
const browser = await chromium.launch();

// Desktop full page
const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const dp = await desk.newPage();
await dp.goto(url, { waitUntil: 'networkidle' });
await dp.waitForTimeout(800);
// force light theme
await dp.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
});
await dp.waitForTimeout(500);
// trigger scroll animations
await dp.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await dp.waitForTimeout(800);
await dp.screenshot({ path: 'shot-desktop-full.png', fullPage: true });
await dp.screenshot({ path: 'shot-desktop-hero.png' });

// Section-by-section
const ids = ['home','how-it-works','why-us','calculator','hot-offers','route-map','testimonials','faq','contact'];
for (const id of ids) {
  const el = await dp.$(`#${id}`);
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await dp.waitForTimeout(600);
    await dp.screenshot({ path: `shot-light-${id}.png` });
  }
}

await desk.close();

// Mobile full page
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const mp = await mob.newPage();
await mp.goto(url, { waitUntil: 'networkidle' });
await mp.waitForTimeout(1200);
await mp.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await mp.waitForTimeout(600);
await mp.screenshot({ path: 'shot-mobile-full.png', fullPage: true });
await mob.close();

await browser.close();
console.log('done');
