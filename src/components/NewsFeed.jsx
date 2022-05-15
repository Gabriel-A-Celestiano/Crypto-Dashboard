import {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: rgba(245,255,250, 0.8);
    padding: 10px;
    margin: 5px;
    box-shadow 0 3px 10px rgb(0 0 0 / 0.2);
    width: 330px;
    height: 450px;
`

const Title = styled.h2`
    text-align: center;
    padding-bottom: 5px;
`

const Links = styled.a`
    text-decoration: none;
    color: #000;
`

const Text = styled.p`
    color: rgba(245,255,250, 0.8);
    padding-bottom: 8px;
`


const NewsFeed = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {

        const options = {
            method: 'GET',
            url: 'https://crypto-news-live3.p.rapidapi.com/news',
            headers: {
                'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY 
            }
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            setArticles(response.data)

        }).catch((error) => {
            console.error(error)
        })
    }, [])

    console.log(articles)

    const first7Articles = articles?.slice(0,7)

    return (
        <Container>
            <Title>News Feed</Title>
            {first7Articles?.map((article, _index) => (
                <div key={_index}>
                    <Links href={article.url} target="_blank"><Text>{article.title}.</Text></Links>
                </div>))}
        </Container>
    )
}

export default NewsFeed