import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
const PCR = require("puppeteer-chromium-resolver");

const getPuppeteer = async () => {
  const PCR = require("puppeteer-chromium-resolver");
  const option = {
    revision: "",
    detectionPath: "",
    folderName: ".chromium-browser-snapshots",
    defaultHosts: [
      "https://storage.googleapis.com",
      "https://npm.taobao.org/mirrors",
    ],
    hosts: [],
    cacheRevisions: 2,
    retry: 3,
    silent: false,
  };
  const stats = await PCR(option);
  return stats;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req;
  const stats = await getPuppeteer();
  const browser = await stats.puppeteer.launch({
    headless: true, // setting this to true will not run the ui
    args: ["--no-sandbox"],
    executablePath: stats.executablePath,
  });

  if (!url) {
    res.status(400).json({ error: "no url provided" });
    return;
  }
  let slug = url.split(".com")[1];

  try {
    const page = await browser.newPage();
    await page.goto(`https://terminal.hackernoon.com${slug}`);

    await page.waitForSelector("pre");

    let text = await page.evaluate(() => {
      return document.querySelector("pre")?.innerText;
    });

    await browser.close();

    text =
      text && text.replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\t|\t|\r)/gm, "");

    res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}
