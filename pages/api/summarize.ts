import { parse } from "node-html-parser";
import { OpenAIStream } from "../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};
const hostname = process.env.HOST;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const replaceSpecialChars = (innerText: string) => {
  return innerText.replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\t|\t|\r)/gm, "");
};

export default async function handler(req: Request) {
  const { url } = (await req.json()) as {
    url?: string;
  };

  if (!url) {
    return new Response("No prompt in the request", { status: 500 });
  }

  try {
    let article: string;

    if (url.includes("techcrunch")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector(".article-content");
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("investopedia")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector("#article_1-0");
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("medium")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector("section");
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("plato.stanford")) {
      const response = await fetch(
        `${hostname}/api/get-text-content?url=${url}&parentIDSelector=aueditable&numberOfChildren=4`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      article = data.text as string;
    } else if (url.includes("wired")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector(
        ".body__inner-container > :not(figure):not(img)"
      );
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("theverge")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector(
        "#content"
      );
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("cnet")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector(
        "#article-body"
      );
      article = replaceSpecialChars(body!.innerText);
    } else if (url.includes("wikipedia")) {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.text();

      const root = parse(data);
      const body = root.querySelector(
        ".mw-parser-output"
      );
      article = replaceSpecialChars(body!.innerText);
    }  
    
    else if (url.includes("hackernoon")) {
      const response = await fetch(`${hostname}/api/playwright?url=${url}`, {
        method: "GET",
      });
      const data = await response.json();
      article = data.text as string;
    } else {
      return new Response("Unsupported site", { status: 500 });
    }

    // make sure the article is under 5000 characters
    article = article.slice(0, 5000);

    const pre_prompt =
      "Summarize the following article/text starting with a markdown heading, focusing on the main points and arguments. The summary should be short and complete, ending with a conclusion or summarizing sentence. Please present the information using only headings and unordered lists in markdown format.\n\n";

    const prompt = pre_prompt + article;

    const payload = {
      prompt,
      model: "text-davinci-003",
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 400,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (e: any) {
    console.log({ e });
    return new Response(e, { status: 500 });
  }
}
