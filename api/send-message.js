/**
 * Vercel Serverless Function
 * Required Vercel environment variables:
 *   TELEGRAM_BOT_TOKEN - BotFather token (keep secret)
 *   TELEGRAM_CHAT_ID   - destination Telegram account/chat ID
 */
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    return res.status(500).json({
      error: "Telegram is not configured. Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel Environment Variables, then redeploy.",
    });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid form request." });
    }
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  const clean = (value) => String(value).trim().slice(0, 2000);
  const text = [
    "New portfolio message",
    `Name: ${clean(name)}`,
    `Email: ${clean(email)}`,
    "",
    clean(message),
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    );

    const telegramResult = await telegramResponse.json().catch(() => ({}));
    if (!telegramResponse.ok || !telegramResult.ok) {
      const description = telegramResult.description || "Unknown Telegram API error";
      console.error("Telegram API error:", description);

      if (description.toLowerCase().includes("chat not found")) {
        return res.status(502).json({
          error: "Telegram chat not found. Check TELEGRAM_CHAT_ID and send /start to your bot first.",
        });
      }

      if (description.toLowerCase().includes("unauthorized")) {
        return res.status(502).json({
          error: "Telegram bot token is invalid. Check TELEGRAM_BOT_TOKEN in Vercel.",
        });
      }

      return res.status(502).json({
        error: "Telegram rejected the message. Check the bot token, chat ID, and that the recipient has started the bot.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram request failed", error);
    return res.status(502).json({ error: "Could not connect to Telegram." });
  }
}
