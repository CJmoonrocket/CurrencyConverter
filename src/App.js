import axios from 'axios';

import React, { useState, useEffect } from 'react';
import './App.css';

import { currencyImgPaths } from './currencyImgPaths';
import { appconfig } from './appconfig';

import { FxItem } from './FxItem';

////
// TO DO
// - Improve Filter UI
////

function App(props)  {
  const { currencies } = appconfig;
  const [displayCurrencies, setDisplayCurrencies] = useState(currencies)
  const [baseCurrency, setBaseCurrency] = useState(appconfig.baseCurrency);
  const [rates, setRates] = useState(appconfig.rates);
  const [baseAmount, setBaseAmount] = useState(appconfig.baseAmount);

  useEffect(() => {
    getRates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[baseCurrency]);

  function getRates() {
    axios({
      method: 'get',
      url: 'https://min-api.cryptocompare.com/data/price',
      params: {
        fsym: baseCurrency,
        tsyms: currencies.join(','),
        api_key: '2ce9fa2c16a10f14e73162f7efff26b2202c902a945d82b1dbe325bd5599fbf9'
      }
    })
    .then(res => {
      setRates(res.data);
    });
  }

  function updateBaseCurrency(currency) {
    setBaseCurrency(currency);
  }

  function handleFilterInputChange(str) {
    const updatedDisplayCurrencies = currencies.filter(currency => currency.toUpperCase().includes(str.toUpperCase()));
    setDisplayCurrencies(updatedDisplayCurrencies);
  }

  return (
    <div className="App">
      <header className="App-header">
         <div className="image-container">
          <img src={currencyImgPaths[baseCurrency]} alt={baseCurrency} /> 
        </div>  
        <div className="input-container">
          <span>{baseCurrency}</span>
          <input type="number" onChange={(e) => setBaseAmount(e.target.value)} defaultValue={1} placeholder="Hello, Padawan!"></input>
        </div>             
      </header>

      <div>
        <input type="text" onChange={(e) => handleFilterInputChange(e.target.value)} placeholder="Try typing..."/>
      </div>

      <div className="fx-item-container">
      {
        displayCurrencies.map(currency => {
          if (currency !== baseCurrency) {
            return (
              <FxItem
                onClickBaseCurrency = {() => updateBaseCurrency(currency)}
                currencySymbol={currency}
                currencyRate={rates[currency]}
                baseAmount={baseAmount}
                key={currency} />
            )
          }
          else return null;
        })
      }
      </div>        
    </div>
  );
}

export default App;
