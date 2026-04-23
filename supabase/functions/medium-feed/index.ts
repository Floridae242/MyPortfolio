// Supabase Edge Function — medium-feed
// Fetches Medium RSS for @naruephonyotmao, parses it, and returns JSON.
// Keeps a 30-minute in-memory cache per warm instance so Medium is only hit
// at most twice per hour per region regardless of traffic.

import { XMLParser } from "npm:fast-xml-parser@4.3.2";

const FEED_URL = "https://medium.com/feed/@naruephonyotmao";
const SERVER_TTL_MS = 30 * 60 * 1000;

type Post = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  excerpt: string;
};

let cache: { at: number; items: Post[] } | null = null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function unwrap(node: unknown): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (typeof obj["#cdata"] === "string") return obj["#cdata"] as string;
    if (typeof obj["#text"] === "string") return obj["#text"] as string;
  }
  return String(node);
}

function pickFirstImage(html: string): string | null {
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const src = m[1];
    // Skip Medium's tracking pixel / stat beacons.
    if (/\/_\/stat\b|[?&]event=post\.clientViewed|\/stat\?/i.test(src)) continue;
    if (/^data:/i.test(src)) continue;
    return src;
  }
  return null;
}

function stripHTML(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(text: string, n: number): string {
  return text.length > n ? text.slice(0, n).trimEnd() + "…" : text;
}

async function fetchFeed(): Promise<Post[]> {
  const res = await fetch(FEED_URL, {
    headers: { "User-Agent": "Mozilla/5.0 MediumFeedEdge/1.0" },
  });
  if (!res.ok) throw new Error(`feed responded ${res.status}`);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    cdataPropName: "#cdata",
    isArray: (name) => name === "item" || name === "category",
  });
  const parsed = parser.parse(xml);
  const rawItems: Record<string, unknown>[] =
    parsed?.rss?.channel?.item ?? [];

  return rawItems.map((it) => {
    const contentHtml = unwrap(it["content:encoded"]) || unwrap(it.description);
    const descHtml = unwrap(it.description);
    const descText = stripHTML(descHtml);
    const contentText = stripHTML(contentHtml);
    const excerptSource = descText.length > 40 ? descText : contentText;
    return {
      title: unwrap(it.title).trim(),
      link: unwrap(it.link).trim(),
      pubDate: unwrap(it.pubDate).trim(),
      thumbnail: pickFirstImage(contentHtml),
      excerpt: clip(excerptSource, 160),
    };
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const now = Date.now();
  try {
    if (!cache || now - cache.at > SERVER_TTL_MS) {
      const items = await fetchFeed();
      cache = { at: now, items };
    }
    return new Response(
      JSON.stringify({ ok: true, items: cache.items, cachedAt: cache.at }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(
      JSON.stringify({ ok: false, items: [], error: message }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
