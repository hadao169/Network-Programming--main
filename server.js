const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

let quotes = [
  {
    id: 1,
    quote: "The only way to do great work is to love what you do.",
    source: "Steve Jobs",
  },
  {
    id: 2,
    quote: "Life is what happens when you're busy making other plans.",
    source: "John Lennon",
  },
  {
    id: 3,
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    source: "Winston Churchill",
  },
  {
    id: 4,
    quote: "It does not matter how slowly you go as long as you do not stop.",
    source: "Confucius",
  },
  {
    id: 5,
    quote: "Believe you can and you're halfway there.",
    source: "Theodore Roosevelt",
  },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve HTML page with 5 random quotes
app.get("/", (req, res) => {
  const shuffledQuotes = [...quotes].sort(() => 0.5 - Math.random());
  const randomQuotes = shuffledQuotes.slice(0, 5);
  // Send the HTML response
  res.render("index.ejs", {
    randomQuotes: randomQuotes,
  });
});

app.get("/all-quotes", (req, res) => {
  res.json(quotes);
});

// Add a new quote
app.post("/add", (req, res) => {
  const { quote, source } = req.body;
  // Validate data
  if (!quote) {
    return res.status(400).json({ error: "Some errors occur!" });
  }

  const newQuote = {
    id: quotes.length + 1,
    quote,
    source: source || "unknown",
  };
  quotes = [...quotes, newQuote];

  res.status(201).json(quotes);
});

// Get a random quote of the day
app.get("/daily", (req, res) => {
  const random = Math.floor(Math.random() * quotes.length);
  if (quotes) {
    const randomDailyQuote = quotes[random];
    res.json(randomDailyQuote);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
