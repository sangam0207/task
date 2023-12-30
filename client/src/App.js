

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/cryptocurrencies')
      .then(response => setCryptocurrencies(response.data))
      .catch(error => console.error('Error fetching cryptocurrencies:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/convert', { sourceCurrency, amount, targetCurrency })
      .then(response => setConvertedAmount(response.data.convertedAmount))
      .catch(error => {
        console.error('Error converting currency:', error);
        
      });
  };

  return (
    <div className='main-box'>
      <div className='box'>
       <div id="currencyConverter">
      <h1>Currency Converter</h1>
      <form id="conversionForm" onSubmit={handleSubmit}>
        <label>
          Source Cryptocurrency:
          <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
            {cryptocurrencies.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Target Currency:
          <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </label>
        <br />
        <button type="submit" id="convertButton">Convert</button>
      </form>

      {convertedAmount !== null && (
        <div>
          <hr/>
          <h2>Converted Amount:</h2>
          <p id="convertedAmount">{convertedAmount} {targetCurrency.toUpperCase()}</p>
        </div>
      )}
    </div>
    </div>
    </div>
    
   
  );
}

export default App;
