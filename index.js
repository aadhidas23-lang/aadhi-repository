require("dotenv").config();

const { App } = require("@slack/bolt");

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
  throw new Error(
    "Missing SLACK_BOT_TOKEN or SLACK_APP_TOKEN in environment variables"
  );
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/aadhibot-ping", async ({ command, ack, respond }) => {
  await ack();

  const start = Date.now();
  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`
  });
});

(async () => {
  try {
    await app.start();
    console.log("bot is running!");
  } catch (error) {
    console.error("Failed to start Slack app:", error);
    process.exit(1);
  }
})();