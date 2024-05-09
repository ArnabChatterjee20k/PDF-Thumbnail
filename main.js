const puppeteer = require("puppeteer");
const sharp = require("sharp");
async function takeScreenShot(url, save) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  //   await page.setViewport({ width: 800, height: 600 }); // Adjust viewport size as needed
  const buffer = (await page.screenshot({ path: save })).buffer;

  // Close Puppeteer
  await browser.close();
  return buffer;
}

async function resize(buffer) {
  const newData = sharp(buffer).extract({
    top: 70,
    left: 330,
    width: 400,
    height: 150,
  });
  newData.toFile("output.png");
}

// takeScreenShot(
//   "https://reminiscent-pony-148.convex.cloud/api/storage/a36f6168-e0f0-4128-b650-494d24484e3f",
//   "image.png"
// ).then((buffer) => resize(buffer));

// takeScreenShot("file:///home/arnab/Desktop/test/Profile.pdf", "image.png").then(
//   (buffer) => resize(buffer)
// );