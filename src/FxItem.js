import './FxItem.css';

import { currencyImgPaths } from './currencyImgPaths';

function FxItem(props) {
        const convertedAmount = props.currencyRate  * props.baseAmount;
        const showMilliDenomination = convertedAmount < 0.01 && convertedAmount;
        const currencySymbol = showMilliDenomination ?
            `m${props.currencySymbol}`
            : props.currencySymbol;
        return (
            <div className="FxItem">
                <div className="currency-symbol" onClick={props.onClickBaseCurrency}>
                    <div  className="curency-logo">
                        <img src={currencyImgPaths[props.currencySymbol]} alt={props.currencySymbol}/>
                    </div>                    
                    <span>{ currencySymbol }</span>
                </div>
                <div className="converted-amount">{ showMilliDenomination ? convertedAmount * 1000 : convertedAmount }</div>
                <div className="currency-rate">{ props.currencyRate }  - {props.currencySymbol}</div>
            </div>
        );
    }

export { FxItem };