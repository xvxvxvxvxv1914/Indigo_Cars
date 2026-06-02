const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  await p.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); });
  await p.waitForTimeout(400);
  // scroll to trigger animations
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(500);

  const sections = ['#offers', '#hero'];
  for (const sel of sections) {
    const el = await p.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await p.waitForTimeout(600);
      await p.screenshot({ path: 'shot2-' + sel.replace('#','') + '.png' });
      console.log('done', sel);
    }
  }

  // RouteMap, CTABanner, Partners — scroll by position
  // Force all hidden animated elements visible
  await p.evaluate(function() {
    document.querySelectorAll('[style*="opacity: 0"]').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      el.classList.add('visible');
    });
  });
  await p.waitForTimeout(500);

  const scrollPositions = [
    { y: 3200, name: 'routemap' },
    { y: 5800, name: 'ctabanner' },
    { y: 6200, name: 'footer' },
  ];
  for (const sp of scrollPositions) {
    await p.evaluate(y => window.scrollTo(0, y), sp.y);
    await p.waitForTimeout(1200);
    await p.screenshot({ path: 'shot2-' + sp.name + '.png' });
    console.log('done', sp.name);
  }

  await b.close();
})();
