# [summary.arguflow.gg](https://summary.arguflow.gg/)

This project summarizes articles for you using AI.

Forked from [TechCrunchSummary.com](https://TechCrunchSummary.com)

https://user-images.githubusercontent.com/15804464/217620078-e0f5ea76-4c28-47b5-9340-595bf40d2e8c.mp4

## How it works

This project uses the [OpenAI GPT-3 API](https://openai.com/api/) (specifically, text-davinci-003) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It fetches the content on a Techcrunch article, sends it in a prompt to the GPT-3 API to summarize it via a Vercel Edge function, then streams the response back to the application.

### Feature List 

Support for [8+ sites](https://summary.arguflow.gg/supported-sites)

- [x] Summary in markdown format
- [ ] Redis caching for popular articles
- [ ] Feedback on quality of summaries 
- [ ] Ability to copy prompt if you want to put it into ChatGPT yourself - maybe you're a premium user! 

## Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called `.env`.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
yarn dev
```
