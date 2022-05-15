import React, {useState} from 'react'
import styled from 'styled-components'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const Container = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 10px;
    margin: 5px;
    box-shadow 0 3px 10px rgb(0 0 0 / 0.2);
    width: 330px;
    height: 450px;
    color: rgba(245,255,250, 0.8);
`

const Title = styled.h2`
    text-align: center;
    padding-bottom: 5px;
`

const Input = styled.input`
    border: none;
    border-radius: 3px;
    padding: 5px;
`

const Select = styled.select`
    border: none;
    border-radius: 3px;
    padding: 5px;
`

const Button = styled.button`
    background-color: rgba(245,255,250, 0.8);
    width: 100%;
    border: none;
    padding: 5px;
    margin-bottom: 5px;
    cursor: pointer;
`

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'BRL', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setchosenPrimaryCurrency] = useState('BTC') 
    const [chosenSecondaryCurrency, setchosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)


    console.log(amount)

    const convert = () => {

        const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        headers: {
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
        }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error)
        })
    }

    console.log(exchangeRate)

    return(
        <Container>
            <Title>Currency Converter</Title>


            <table>
                <tbody>
                    <tr>
                        <td>Currency:</td>
                        <td>
                            <Input 
                                type='number'
                                name='currency-amount-1'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <Select 
                                value={chosenPrimaryCurrency}
                                name='currency-option-1'
                                className='currency-options'
                                onChange={(e) => setchosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Converted to:</td>
                        <td>
                            <Input 
                                type='number'
                                name='currency-amount-2'
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <Select 
                                value={chosenSecondaryCurrency}
                                name='currency-option-2'
                                className='currency-options'
                                onChange={(e) => setchosenSecondaryCurrency(e.target.value)}
                            >
                               {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </Select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Button id="convert-button"
                    onClick={convert}>
                Convert
            </Button>

            <ExchangeRate 
                exchangeRate={exchangeRate}
                chosenPrimaryCurrency={chosenPrimaryCurrency}
                chosenSecondaryCurrency={chosenSecondaryCurrency}

            />
        </Container>
    )
}

export default CurrencyConverter 