const puppeteer = require("puppeteer");
const { checkAndGenerate, generateText } = require("./util");

// Unit Test for generateText function
test("should output name and age", () => {
  const text = generateText("Brian", 48);
  expect(text).toBe("Brian (48 years old)");
});

// Unit Test for generateText function
test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
  const text2 = generateText();
  expect(text2).toBe("undefined (undefined years old)");
});

// Integration Test for checkAndGenerate function which uses generateText and ValidateInput
test("should generate a valid text output", () => {
  const text = checkAndGenerate("Brian", 48);
  expect(text).toBe("Brian (48 years old)");
});

// End to End Test in the chromium browser
test("should click around", async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 25,
    args: ["--window-size=800,600"],
    product: "chrome"
  });
  console.log(await browser.userAgent());
  const page = await browser.newPage();
  await page.goto("file:///Users/blang/Projects/js-testing-intro/index.html");
  await page.click("input#name");
  await page.type("input#name", "Tammy");
  await page.click("input#age");
  await page.type("input#age", "44");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Tammy (44 years old)");
  await browser.close();
}, 10000);
