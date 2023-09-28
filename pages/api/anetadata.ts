import type { NextApiRequest, NextApiResponse } from "next";

const URL = "https://aneta-data.vercel.app/api/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }
  
   const fetchResponse = await (
    await fetch(`${URL}`, {})
  ).json();

  res.status(200).send(fetchResponse);
}