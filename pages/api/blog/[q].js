import { client } from "@/libs/client";

export default async function handler(req, res) {
  const { method, query } = req;
  try {
    if (method === "GET") {
      const data = await client.get({
        endpoint: "blog",
        queries: { q: query.q },
      });
      return res.status(200).json(data);
    }
  } catch (error) {}
  return res.status(500).json({
    error: {
      status: 500,
      code: "BAD",
      message: "不正なリクエストです。",
    },
  });
}
