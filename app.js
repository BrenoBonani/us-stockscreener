// server config 
const app = require("./config/server");





app.get("/", function(req, res){

    res.render("home");

});

// app & post routes
const overview = require("./routes/overview")(app);
const balance_sheet = require("./routes/balance_sheet")(app); 
const earnings = require("./routes/earnings")(app);
const ratio = require("./routes/ratio")(app);

// app listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

