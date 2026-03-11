const puppeteer = require('puppeteer');
const path = require('path');

describe('Sign In / Sign Up Page', () => {
  let browser;
  let page;
  const signInUpPath = 'file://' + path.resolve(__dirname, 'C:\\Users\\user\\OneDrive\\שולחן העבודה\\FULL STACK\\webPro-main\\webPro-main\\client\\src\\sign-in-up\\sign-in-up.html');
  
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: "new", 
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage' 
    ]
  });
  page = await browser.newPage();
  await page.goto(signInUpPath);
});

  afterAll(async () => {
    await browser.close();
  });

  test('page has correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Modern login page');
  });

  test('Sign Up form exists with h1 "Create Account"', async () => {
    const h1Text = await page.$eval('.sign-up h1', el => el.textContent);
    expect(h1Text).toBe('Create Account');
  });

  test('Sign In form exists with h1 "Sign In"', async () => {
    const h1Text = await page.$eval('.sign-in h1', el => el.textContent);
    expect(h1Text).toBe('Sign In');
  });

  test('Sign Up form has 3 input fields', async () => {
    const inputs = await page.$$eval('.sign-up input', els => els.length);
    expect(inputs).toBe(3);
  });

  test('Sign In form has 2 input fields', async () => {
    const inputs = await page.$$eval('.sign-in input', els => els.length);
    expect(inputs).toBe(2);
  });

  test('Sign Up and Sign In forms have submit buttons', async () => {
    const signUpButton = await page.$eval('.sign-up button[type="submit"]', el => el.textContent);
    const signInButton = await page.$eval('.sign-in button[type="submit"]', el => el.textContent);
    expect(signUpButton).toBe('Sign Up');
    expect(signInButton).toBe('Sign In');
  });

  test('Social icons exist in both forms', async () => {
    const signUpIcons = await page.$$eval('.sign-up .social-icons a', els => els.length);
    const signInIcons = await page.$$eval('.sign-in .social-icons a', els => els.length);
    expect(signUpIcons).toBe(4);
    expect(signInIcons).toBe(4);
  });
});