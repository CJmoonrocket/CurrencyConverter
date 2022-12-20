import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Helpers
import { setCookie, getCookie } from './cookies';

//CSS
import './App.css';

// Config
import { currencyImgPaths } from './currencyImgPaths';
import { appconfig } from './appconfig';

// Components
import { FxItem } from './FxItem';
import { SettingsModal } from './SettingsModal';

////
// TO DO
// - Persist settings via cookies
// - Add more Settings?
////

function App(props)  {
  const { currencies } = appconfig;

  const [displayCurrencies, setDisplayCurrencies] = useState(currencies)
  const [baseCurrency, setBaseCurrency] = useState(appconfig.baseCurrency);
  const [rates, setRates] = useState(appconfig.rates);
  const [baseAmount, setBaseAmount] = useState(appconfig.baseAmount);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [disabledDenominationAdjustment, setDisabledDenominationAdjustment] = useState(false);

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

  function toggleSettingsModal() {
    setShowSettingsModal(!showSettingsModal);
  }

  function toggleDisabledDenominationAdjustment() {
    setDisabledDenominationAdjustment(!disabledDenominationAdjustment);
  }

  return (
    <div className="App">
      <header className="App-header">
         <div className="image-container">
          <img src={currencyImgPaths[baseCurrency]} alt={baseCurrency} /> 
        </div>  
        <div className="input-container">
          <span>{baseCurrency}</span>
          <input type="number" onChange={(e) => setBaseAmount(e.target.value)} defaultValue={baseAmount} placeholder="Hello, Padawan!"></input>
        </div>
        <div className="settings-button-container image-container">
          <img src="/settings.png" alt="cogs" onClick={toggleSettingsModal}/>
        </div>      
      </header>

      <div className="search-bar-container">
        <input type="text" onChange={(e) => handleFilterInputChange(e.target.value)} placeholder="Type to filter" defaultValue={""}/>
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
                disabledDenominationAdjustment={disabledDenominationAdjustment}
                key={currency} />
            )
          }
          else return null;
        })
      }
      </div>
      <SettingsModal
        closeModal={() => setShowSettingsModal(false)}
        disabledDenominationAdjustment={disabledDenominationAdjustment}
        toggleDisabledDenominationAdjustment={toggleDisabledDenominationAdjustment}
        showSettingsModal={showSettingsModal} />
    </div>
  );
}

export default App;
