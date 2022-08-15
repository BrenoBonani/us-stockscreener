const https = require("https");

module.exports = (app) => {

app.get("/balance_sheet_hp", (req, res) => {
    res.render("balance_sheet_hp");
});


// app post 
app.post("/balance_sheet", (req, res) => {
    const apiKey = process.env.API_KEY;
    const queryTicker = req.body.tickerName.toUpperCase();
    const url = process.env.URL_BALANCE_SHEET + queryTicker + "?limit=120&apikey=" + apiKey;
    

// https for response the data
https.get(url, function(response){
    console.log(response);

    

    response.on("data", function(data){
        const financialData = JSON.parse(data);
        console.log(financialData);

        // overview company
        const fYear = financialData[0].calendarYear;
        const symbol = financialData[0].symbol;
        const reportedCurrency = financialData[0].reportedCurrency;
        

        // balance sheet 
        const cashAndEquivalents = financialData[0].cashAndCashEquivalents.toLocaleString();
        const invetory = financialData[0].inventory.toLocaleString();
        const netReceivables = financialData[0].netReceivables.toLocaleString();
        const shortTermInvestments = financialData[0].shortTermInvestments.toLocaleString();
        const longTermInvestments = financialData[0].longTermInvestments.toLocaleString();
        const shortTermDebt = financialData[0].shortTermDebt.toLocaleString();
        const longTermDebt = financialData[0].longTermDebt.toLocaleString();
        const netDebt = financialData[0].netDebt.toLocaleString();
        const totalEquity = financialData[0].totalEquity.toLocaleString();
        const totalAssets = financialData[0].totalAssets.toLocaleString();
        const totalLiabilities = financialData[0].totalLiabilities.toLocaleString();
    
        

      
   
        res.render("balance_sheet", {fYear: fYear, symbol: symbol, reportedCurrency: reportedCurrency, 
            cashAndEquivalents: cashAndEquivalents, invetory: invetory, netReceivables: netReceivables, 
            shortTermInvestments: shortTermInvestments, longTermInvestments: longTermInvestments, 
            longTermDebt: longTermDebt, shortTermDebt: shortTermDebt, netDebt: netDebt, totalEquity: totalEquity,
            totalAssets: totalAssets, totalLiabilities: totalLiabilities});
    });  
});
});
}