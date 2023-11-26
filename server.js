const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

const recordWebsite = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  const recorder = new PuppeteerScreenRecorder(page);

  await page.goto("https://interactly.video/");

  await recorder.start("output.mp4");

  await animate(page);

  await recorder.stop();

  await browser.close();
};

const animate = async (page) => {

    await page.evaluate(async () => {

        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 500;

            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy({ top: distance, left: 0, behavior: "smooth" });
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    });
};

recordWebsite();
