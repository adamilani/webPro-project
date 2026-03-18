const puppeteer = require('puppeteer');
const path = require('path');

describe('Home Page - World Cup Edition', () => {
  let browser;
  let page;
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

  test('header contains World Cup text', async () => {
    const h1Text = await page.$eval('header h1', el => el.textContent);
    expect(h1Text).toContain('FIFA WORLD CUP 2026');
  });

  test('navigation links are correct', async () => {
    const links = await page.$$eval('nav a', els => els.map(el => el.textContent));
    expect(links).toEqual(['Match Schedule', 'Host Cities', 'Tickets']);
  });

  test('countdown exists', async () => {
    const countdownText = await page.$eval('#countdown-container', el => el.textContent);
    expect(countdownText).toContain('Kickoff In:');
  });

  test('ticket button text updated', async () => {
    const buttonText = await page.$eval('#cart-button', el => el.textContent);
    expect(buttonText).toBe('View My Tickets');
  });
});