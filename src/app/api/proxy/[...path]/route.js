const BASE_URL = process.env.BACKEND_URL;

export async function handler(req, { params }) {
  try {
    const path = params?.path?.join("/") || "";
    const url = `${BASE_URL}/${path}`;

    const method = req.method;

    const headers = new Headers(req.headers);
    headers.delete("host");

    let body;
    if (!["GET", "HEAD"].includes(method)) {
      body = await req.text();
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;