const DEFAULT_BASE_URL = "https://api.mimo-v2.com/v1";
const DEFAULT_MODEL = "mimo-v2-pro";

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function getApiConfig() {
  const apiKey = process.env.MIMO_API_KEY || process.env.XIAOMI_API_KEY || "";
  const baseUrl = (process.env.MIMO_BASE_URL || process.env.XIAOMI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const model = process.env.MIMO_MODEL || process.env.XIAOMI_MODEL || DEFAULT_MODEL;
  return { apiKey, baseUrl, model };
}

function normalizeMessage(message) {
  if (!message || typeof message !== "object") return null;
  const role = message.role === "assistant" ? "assistant" : "user";
  const content = typeof message.content === "string" ? message.content.trim() : "";
  if (!content) return null;
  return { role, content };
}

function readJsonBody(request) {
  if (!request.body) return {};
  if (typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return {};
}

async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Only POST requests are supported." });
    return;
  }

  const { apiKey, baseUrl, model } = getApiConfig();
  if (!apiKey) {
    sendJson(response, 500, {
      error: "Missing MIMO_API_KEY. Add it in Vercel Project Settings > Environment Variables.",
    });
    return;
  }

  const body = readJsonBody(request);
  const messages = Array.isArray(body.messages) ? body.messages.map(normalizeMessage).filter(Boolean) : [];
  if (!messages.length) {
    sendJson(response, 400, { error: "Please send at least one message." });
    return;
  }

  const systemPrompt = [
    "You are DP, a world-class expert on seas, oceanography, marine ecology, fish, fisheries, coastal monitoring, water quality, and Dapeng Bay / Mirs Bay.",
    "Only answer questions that are clearly related to marine areas, oceans, fish, fisheries, marine biodiversity, water quality, coastal climate, marine monitoring, or Dapeng Bay / Mirs Bay.",
    "If the user asks about anything outside that scope, politely refuse in the user's language in one short sentence, then suggest a marine-related question you can help with.",
    "Answer in the user's language. Be concise, specific, and useful for a polished marine dashboard experience.",
    "When facts are uncertain, say so plainly and suggest what monitoring data would confirm it.",
  ].join(" ");

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.65,
        top_p: 0.95,
        max_completion_tokens: 900,
        stream: false,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10),
        ],
      }),
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      sendJson(response, upstream.status, {
        error: data?.error?.message || data?.message || text || "MiMo API request failed.",
      });
      return;
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    sendJson(response, 200, {
      answer: answer || "MiMo returned an empty response. Please try again.",
      model,
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "Failed to reach MiMo API.",
    });
  }
}

module.exports = handler;
