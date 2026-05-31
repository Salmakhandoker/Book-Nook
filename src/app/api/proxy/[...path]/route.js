// app/api/proxy/[...path]/route.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(req, { params }) {
  try {
    if (!BASE_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is missing");
    }

    const path = params?.path?.join("/") || "";

    // query string
    const urlObj = new URL(req.url);
    const query = urlObj.searchParams.toString();

    const targetUrl = `${BASE_URL}/${path}${query ? `?${query}` : ""}`;

    // ✅ minimal safe headers (NO COOKIE, NO AUTH)
    const headers = new Headers();

    req.headers.forEach((value, key) => {
      const blocked = [
        "host",
        "connection",
        "content-length",
        "accept-encoding",
      ];

      if (!blocked.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // body handling
    let body;
    if (!["GET", "HEAD"].includes(req.method)) {
      body = await req.text();
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const contentType = response.headers.get("content-type") || "";

    let data;
    try {
      data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch {
      data = await response.text();
    }

    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status: response.status,
        headers: {
          "Content-Type": contentType || "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;