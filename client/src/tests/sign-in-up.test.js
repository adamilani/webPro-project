const puppeteer = require('puppeteer');
const path = require('path');

describe('FIFA Fan ID Portal', () => {
  let browser;
  let page;
  const signInUpPath = `file://${path.resolve(__dirname, '../sign-in-up/sign-in-up.html')}`;  

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new", 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto(signInUpPath);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('page has correct FIFA title', async () => {
    const title = await page.title();
    expect(title).toBe('FIFA Fan ID Portal');
  });

  test('Sign Up form has Fan ID header', async () => {
    const h1Text = await page.$eval('.sign-up h1', el => el.textContent);
    expect(h1Text).toBe('Create Fan ID');
  });

  test('Sign In button has Kick Off text', async () => {
    const buttonText = await page.$eval('.sign-in button[type="submit"]', el => el.textContent);
    expect(buttonText).toBe('Kick Off');
  });

  test('Toggle right has correct FIFA message', async () => {
    const h1Text = await page.$eval('.toggle-right h1', el => el.textContent);
    expect(h1Text).toBe('Hello, Fan!');
  });
});