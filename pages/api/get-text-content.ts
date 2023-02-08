import { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";
import { replaceSpecialChars } from "./summarize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url;
  const parentIDSelector = req.query.parentIDSelector;
  const parentClassSelector = req.query.parentClassSelector;
  const numberOfChildren = req.query.numberOfChildren;

  if (!parentIDSelector && !parentClassSelector) {
    res.status(400).json({ error: "no parent selector provided" });
    return;
  }

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "no url provided" });
    return;
  }

  const selector = parentIDSelector
    ? `#${parentIDSelector}`
    : `.${parentClassSelector}`;

  const numberOfChildrenInt = numberOfChildren ? parseInt(numberOfChildren as string) : 3;

  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.text();

  const dom = new JSDOM(data);
  const children = dom.window.document.querySelectorAll(selector + " > *");

  const parent = dom.window.document.createElement("div");
  for (let i = 0; i < numberOfChildrenInt; i++) {
    parent.appendChild(children[i]);
  }

  const parentText = parent.textContent ?? "";

  const article = replaceSpecialChars(parentText);

  res.status(200).json({ text: article });
}
