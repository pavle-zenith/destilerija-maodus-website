import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = "http://localhost:3000/rakije/dunja-barrique";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.3 });
await page.setCookie(
  { name: "maodus_age_ok", value: "1", domain: "localhost" },
  { name: "maodus_consent", value: "granted", domain: "localhost" },
);
await page.goto(url, { waitUntil: "networkidle0" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const el = await page.$('section[aria-labelledby="senzorni"]');
await el.evaluate((n) => n.scrollIntoView({ block: "start" }));
// wait well past a transition so the slider is settled on a panel
await new Promise((r) => setTimeout(r, 2000));
await el.screenshot({ path: "/tmp/g-merged-settled.png" });
console.log("shot /tmp/g-merged-settled.png");
await browser.close();
console.log("done");
