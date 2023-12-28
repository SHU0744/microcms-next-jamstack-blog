import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "3a9h8g0oy1",
  apiKey: process.env.API_KEY,
});
