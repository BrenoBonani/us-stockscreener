const https = require("https");

module.exports = (app) => {

app.get("/earnings_hp", (req, res) => {
    res.render("earnings_hp");
});


// app post 
app.post("/earnings", (req, res) => {
    const apiKey = process.env.API_KEY;
    const queryTicker = req.body.tickerName.toUpperCase();
    const url = process.env.URL_INCOME_STATEMENT + queryTicker + "?limit=120&apikey=" + apiKey;
    

// https for response the data
https.get(url, function(response){
    console.log(response);

    

    response.on("data", function(data){

        async function run() {
        const financialData = await JSON.parse(data);
        console.log(financialData);

        // overview company
        const date = financialData[0].date;
        const symbol = financialData[0].symbol;
        const reportedCurrency = financialData[0].reportedCurrency;

        
        // income statement 
        const revenue = financialData[0].revenue.toLocaleString();
        const costOfRevenue = financialData[0].costOfRevenue.toLocaleString();
        const grossProfit = financialData[0].grossProfit.toLocaleString();
        const grossProfitRatio = (financialData[0].grossProfitRatio * 100).toFixed(2) ;
        const researchAndDevExpenes = financialData[0].researchAndDevelopmentExpenses.toLocaleString();
        const sgAndAdmin = financialData[0].sellingGeneralAndAdministrativeExpenses.toLocaleString();
        const operatingExpenses = financialData[0].operatingExpenses.toLocaleString();
        const interestIncome = financialData[0].interestIncome.toLocaleString();
        const interestExpense = financialData[0].interestExpense.toLocaleString();
        const depreciationAndAmortization = financialData[0].depreciationAndAmortization.toLocaleString();
        const ebitda = financialData[0].ebitda.toLocaleString();
        const ebitdaRatio = (financialData[0].ebitdaratio * 100).toFixed(2);
        const operatingIncome = financialData[0].operatingIncome.toLocaleString();
        const operatingIncomeRatio = (financialData[0].operatingIncomeRatio * 100).toFixed(2);
        const incomeBeforeTax = financialData[0].incomeBeforeTax.toLocaleString();
        const incomeTaxExpense = financialData[0].incomeTaxExpense.toLocaleString();
        const netIncome = financialData[0].netIncome.toLocaleString();
        const netIncomeRatio = (financialData[0].netIncomeRatio * 100).toFixed(2);
        const eps = financialData[0].eps.toLocaleString();

      
   
        res.render("earnings", {date: date, symbol: symbol, reportedCurrency: reportedCurrency, revenue: revenue, costOfRevenue: costOfRevenue, 
            grossProfit: grossProfit, grossProfitRatio: grossProfitRatio, researchAndDevExpenes: researchAndDevExpenes, sgAndAdmin: sgAndAdmin,
            operatingExpenses: operatingExpenses, interestIncome: interestIncome, interestExpense: interestExpense, depreciationAndAmortization: depreciationAndAmortization,
            ebitda: ebitda, ebitdaRatio: ebitdaRatio, operatingIncome: operatingIncome, operatingIncomeRatio: operatingIncomeRatio,
            incomeBeforeTax: incomeBeforeTax, incomeTaxExpense: incomeTaxExpense, netIncome: netIncome, netIncomeRatio, eps: eps});
        }
        
        run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });  
});
});
}