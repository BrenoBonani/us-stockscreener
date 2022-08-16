const https = require("https");

module.exports = (app) => {

// app get
app.get("/ratio_hp", (req, res) => {
    res.render("ratio_hp");
});
    
// app post 
app.post("/ratio", (req, res) => {
    const apiKey = process.env.API_KEY;
    const queryTicker = req.body.tickerName.toUpperCase();
    const url = process.env.URL_RATIO + queryTicker + "?limit=40&apikey=" + apiKey;
    

// https for response the data
https.get(url, function(response){
    console.log(response);

    

    response.on("data", function(data){

        async function run() {
        const financialData = await JSON.parse(data);
        console.log(financialData);

        // overview company
        const symbol = financialData[0].symbol;
        const date = financialData[0].date;


        // ratio status
        const enterpriseValue = Math.round(financialData[0].enterpriseValue).toLocaleString();
        const marketCap = Math.round(financialData[0].marketCap).toLocaleString();
        const revenuePerShare = financialData[0].revenuePerShare.toFixed(2);
        const bookValuePerShare = financialData[0].bookValuePerShare.toFixed(2);
        const peRatio = financialData[0].peRatio.toFixed(2);
        const priceBookRatio = financialData[0].pbRatio.toFixed(2);
        const priceSalesRatio = financialData[0].priceToSalesRatio.toFixed(2);
        const evToSales = financialData[0].evToSales.toFixed(2);
        const fcfToYield = (financialData[0].freeCashFlowYield * 100).toFixed(2);
        const roeRatio = (financialData[0].roe * 100).toFixed(2);
        const roicRatio = (financialData[0].roic * 100).toFixed(2);
        const debtToEquity = (financialData[0].debtToEquity * 100).toFixed(2);
        const netDebtToEbitda = financialData[0].netDebtToEBITDA.toFixed(2);
        const dividendYield = (financialData[0].dividendYieldPercentage * 100).toFixed(2);
        const payOutRatio = (financialData[0].payoutRatio * 100).toFixed(2);
        const currentRatio = financialData[0].currentRatio.toFixed(2);

      
   
        res.render("ratio", {symbol: symbol, date: date, enterpriseValue: enterpriseValue, marketCap: marketCap, 
            revenuePerShare: revenuePerShare, bookValuePerShare: bookValuePerShare, peRatio: peRatio, priceBookRatio: priceBookRatio,
            priceSalesRatio: priceSalesRatio, evToSales: evToSales, fcfToYield: fcfToYield, roeRatio: roeRatio, roicRatio: roicRatio,
            debtToEquity: debtToEquity, netDebtToEbitda: netDebtToEbitda, dividendYield: dividendYield, payOutRatio: payOutRatio, 
            currentRatio: currentRatio});
        }

        run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });  
});
});
}
