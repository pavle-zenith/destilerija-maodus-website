import puppeteer from "puppeteer-core";

const OUT = "/private/tmp/claude-501/-Users-zenith-destilerija-maodus-website/ecc29a4a-53d3-4b5b-9bdc-5631cda051d5/scratchpad";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});

const page = await browser.newPage();
await page.setCookie(
  { name: "maodus_age_ok", value: "1", domain: "localhost" },
  { name: "maodus_consent", value: "granted", domain: "localhost" }
);

// deviceScaleFactor 1 to avoid the >16384 device-px fullPage wrap bug on tall pages
await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });

for (const [slug, name] of [
  ["dunja", "detail-dunja.png"],
  ["sljiva-barrique-classic", "detail-sljiva-classic.png"],
]) {
  await page.goto(`http://localhost:3000/rakije/${slug}`, { waitUntil: "networkidle0" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto}" });
  // scroll-walk to trigger Reveal animations
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
  console.log(name);
}

await browser.close();
console.log("done");
