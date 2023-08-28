const cors = require('cors'); 
const express = require("express");
const path = require("path");

const app = express();

// Serve the static files from the dist folder (generated by ng build)
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  next();
});
app.use(express.static(__dirname + "/dist/turmalina"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/turmalina/index.html"));
});

// Start the application through the configured port
app.listen(process.env.PORT || 8080);