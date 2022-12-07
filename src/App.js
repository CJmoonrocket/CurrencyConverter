import axios from 'axios';

import React, { Component } from 'react';
import './App.css';
import { FxItem } from './FxItem';
import { currencyImgPaths } from './currencyImgPaths';
import { appConfig } from './appconfig';

////
// TO DO
// - Add missing currencies
// - Add filter
////


class App extends Component {
  constructor(props) {
    super(props);
    this.state = appConfig;
  }

  
  componentDidMount() {
    this.setRates();
  }

  setRates() {
    axios({
      method: 'get',
      url: 'https://min-api.cryptocompare.com/data/price',
      params: {
        fsym: this.state.baseCurrency,
        tsyms: this.state.currencies.join(','),
        api_key: '2ce9fa2c16a10f14e73162f7efff26b2202c902a945d82b1dbe325bd5599fbf9'
      }
    })
    .then(res => {
      this.setState({
        rates: res.data
      });
    });
  }

  setBaseCurrency(currency) {
    this.setState({ baseCurrency: currency }, () => this.setRates());
  }

  handleInputChange(e) {
    this.setState({
      baseAmount: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
           <div className="image-container">
            <img src={currencyImgPaths[this.state.baseCurrency]} alt={currencyImgPaths[this.state.baseCurrency]} /> 
          </div>  
          <div className="input-container">
            <span>{this.state.baseCurrency}</span>
            <input type="number" onChange={(e) => this.handleInputChange(e)} defaultValue={1} placeholder="Do something, Padawan!"></input>
          </div>
               
        </header>

        
        <div className="fx-item-container">
        {
          this.state.currencies.map(currency => {
            if (currency !== this.state.baseCurrency) {
              return (
                <FxItem
                  onClickBaseCurrency = {() => this.setBaseCurrency(currency)}
                  currencySymbol={currency}
                  currencyRate={this.state.rates[currency]}
                  baseAmount={this.state.baseAmount}
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
  
}

export default App;
