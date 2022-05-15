import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: inheret;
    box-shadow 0 3px 10px rgb(0 0 0 / 0.2);
    color: rgba(245,255,250, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
    padding: 10px;
    margin: 5px;
`

const Title = styled.h1`
    text-align: center;
    padding-bottom: 5px;
`

const ExchangeRate = ({exchangeRate, chosenPrimaryCurrency,chosenSecondaryCurrency }) => {
    return(
        <Container>
            <Title>Exchange Rate</Title>
            <h1>{exchangeRate}</h1>
            <p>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
        </Container>
    )
}

export default ExchangeRate 