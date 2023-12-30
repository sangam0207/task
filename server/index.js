

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors=require('cors')
const app = express();
const port = 3001; 
app.use(cors());
app.use(bodyParser.json());


app.get('/cryptocurrencies', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/convert', async (req, res) => {
  const { sourceCurrency, amount, targetCurrency } = req.body;
  
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: sourceCurrency,
        vs_currencies: targetCurrency,
      },
    });

    const exchangeRate = response.data[sourceCurrency][targetCurrency];
    const convertedAmount = amount * exchangeRate;

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
