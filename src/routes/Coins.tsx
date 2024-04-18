import styled from "styled-components";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet} from "react-helmet"
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
    padding: 0 20px;
    margin: 0 auto;
    max-width: 480px;
`;

const Header = styled.div`
    display: flex; align-items: center; justify-content: center;
    height: 10vh;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    padding: 20px;
    margin-bottom: 10px;
    color: ${props => props.theme.boxTextColor};
    background-color: ${props => props.theme.listColor};
    box-shadow: 0 0 5px rgba(0,0,0,.3);
    border-radius: 15px;

    a {
        display: flex; align-items: center;
        transition: color 0.2s ease-in;
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    display: block;
    text-align: center;
`

const Img = styled.img`
    margin-right: 10px;
    width: 35px; height: 35px;
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps {}

function Coins({}:ICoinsProps){
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const res = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await res.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    },[]);
    */

    
    const { isLoading, data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);

    return(
    <Container>
        <Helmet>
            <title>All Coins</title>
        </Helmet>
        <Header>
            <Title>Coin</Title>
        </Header>
        {isLoading ? 
            (<Loader>Loading...</Loader>) : (
                <CoinList>
                    {data?.slice(0,100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: {name: coin.name},
                            }}>
                                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} alt={`${coin.symbol} logo img`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )
        }
    </Container>
)}

export default Coins;