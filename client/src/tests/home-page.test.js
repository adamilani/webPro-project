const puppeteer = require('puppeteer');
const path = require('path');

describe('Home Page - World Cup Edition', () => {
  let browser;
  let page;
  // וודא שהנתיב הזה נכון ב-GitHub Action שלך
  const homePagePath = `file://${path.resolve(__dirname, '../home-page/home-page.html')}`;
  
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new", 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto(homePagePath);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('page has correct FIFA title', async () => {
    const title = await page.title();
    expect(title).toBe('FIFA World Cup 2026'); 
  });

  test('header contains FIFA WORLD CUP text', async () => {
    const h1Text = await page.$eval('header h1', el => el.textContent);
    expect(h1Text).toContain('FIFA WORLD CUP 2026');
  });

  test('navigation links are updated', async () => {
    const links = await page.$$eval('nav a', els => els.map(el => el.textContent));
    expect(links).toContain('Match Schedule');
    expect(links).toContain('Tickets');
  });

  test('countdown element exists', async () => {
    const countdownExists = await page.$('#countdown-container');
    expect(countdownExists).not.toBeNull();
  });
});