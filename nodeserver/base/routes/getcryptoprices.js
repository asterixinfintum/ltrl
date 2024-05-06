import express from 'express';
import Moralis from 'moralis';

const getcryptoprices = express();

getcryptoprices.get('/getcryptoprices', async (req, res) => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.LIS
    });
  }

  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      "chain": "0x38",
      "include": "percent_change",
      "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    });

    const usdPrice = response.raw.usdPrice

    res.status(200).send({
      etherprice: usdPrice
    })
  } catch (e) {
    console.error(e);
  }
})

export default getcryptoprices;