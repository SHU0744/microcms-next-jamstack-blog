import { client } from "@/libs/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await client.get({ endpoint: "blog" });
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
