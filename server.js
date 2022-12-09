const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files for app
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
