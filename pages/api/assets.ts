import type { NextApiRequest, NextApiResponse } from "next";
import { BLOCKFROST_URL, CardanoNetwork } from "../../utils/api";

const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BLOCKFROST_PROJECT_ID = `${process.env.BLOCKFROST_PROJECT_ID}`;
const ASSET_ID = process.env.CBTC_ASSET_ID;



const values = (  req: NextApiRequest,
  res: NextApiResponse) => {
    if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID || !ASSET_ID) {
      return res
        .status(500)
        .send("Server is not setup properly. Missing .env file");
    }
  
  res.status(200).json({
    projectId: BLOCKFROST_PROJECT_ID,
    url: `${BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork]}/assets/${ASSET_ID}`,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){

  if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID || !ASSET_ID) {
    return res
      .status(500)
      .send("Server is not setup properly. Missing .env file");
  }

  const data = await values(req, res);

  const blockfrostUrl = BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork];
  const assetId = ASSET_ID;
  //const url = `${blockfrostUrl}/assets/${assetId}`
  //const url = "https://cardano-preprod.blockfrost.io/api/v0/assets/2c04fa26b36a376440b0615a7cdf1a0c2df061df89c8c055e265050563425443"
  //const url = data.url;
  const headers = {
    //project_id: BLOCKFROST_PROJECT_ID
    //project_id: "preprodZ5sdrHtIciQKn3Ls3phRfCkqtVyFq5XX"
    //project_id: data.projectId,
  }

/*   try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  } */
}
