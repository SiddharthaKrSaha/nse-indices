export default async function handler(req, res) {

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

    res.status(200).json({

      nifty: {
        price: niftyMeta.regularMarketPrice,
        change: niftyMeta.regularMarketChange,
        percent: niftyMeta.regularMarketChangePercent
      },

      sensex: {
        price: sensexMeta.regularMarketPrice,
        change: sensexMeta.regularMarketChange,
        percent: sensexMeta.regularMarketChangePercent
      }

    });

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch index data"
    });

  }

}
