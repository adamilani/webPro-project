const puppeteer = require('puppeteer');
const path = require('path');

describe('Home Page', () => {
  let browser;
  let page;
  const homePagePath = 'file://' + path.resolve(__dirname, 'C:\\Users\\user\\OneDrive\\שולחן העבודה\\FULL STACK\\webPro-main\\webPro-main\\client\\src\\home-page\\home-page.html');

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(homePagePath);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('page has correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Home Page'); 
  });

  test('header contains correct h1', async () => {
    const h1Text = await page.$eval('header h1', el => el.textContent);
    expect(h1Text).toBe('you are welcome !!!');
  });

  test('navigation contains 3 links', async () => {
    const links = await page.$$eval('nav a', els => els.map(el => el.textContent));
    expect(links).toEqual(['main', 'catalog', 'contacts']);
  });

  test('sort select exists with 3 options', async () => {
    const options = await page.$$eval('#sort-select option', els => els.map(el => el.value));
    expect(options).toEqual(['name', 'category', 'price']);
  });

  test('cart button exists', async () => {
    const buttonText = await page.$eval('#cart-button', el => el.textContent);
    expect(buttonText).toBe('go to cart');
  });

  test('section contains h2 "sale!"', async () => {
    const h2Text = await page.$eval('section h2', el => el.textContent);
    expect(h2Text).toBe('sale!');
  });
});