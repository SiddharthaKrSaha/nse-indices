export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {

    const niftyResponse = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI"
    );

    const niftyData = await niftyResponse.json();

    const niftyMeta =
      niftyData.chart.result[0].meta;

    const sensexResponse = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/%5EBSESN"
    );

    const sensexData = await sensexResponse.json();

    const sensexMeta =
      sensexData.chart.result[0].meta;

    const niftyChange =
      niftyMeta.regularMarketPrice - niftyMeta.previousClose;

    const niftyPercent =
      (niftyChange / niftyMeta.previousClose) * 100;

    const sensexChange =
      sensexMeta.regularMarketPrice - sensexMeta.previousClose;

    const sensexPercent =
      (sensexChange / sensexMeta.previousClose) * 100;

    res.status(200).json({

      nifty: {
        price: niftyMeta.regularMarketPrice,
        change: niftyChange,
        percent: niftyPercent
      },

      sensex: {
        price: sensexMeta.regularMarketPrice,
        change: sensexChange,
        percent: sensexPercent
      }

    });

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch index data"
    });

  }

}
