import { useEffect, useState } from "react";
import { useLocation, useParams, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0 20px;
    margin: 0 auto;
    max-width: 480px;
`;

const Header = styled.div`
    display: flex; align-items: center; justify-content: center;
    height: 10vh;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    display: block;
    text-align: center;
`

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    color: ${props => props.theme.boxTextColor};
    border-radius: 10px;
    background-color: ${props => props.theme.listColor};
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
    color: ${props => props.theme.textColor}
`;

const Tabs = styled.div`
    display: grid; grid-template-columns: repeat(2, 1fr);
    margin: 25px 0; 
    gap: 10px
`

const Tab = styled.span<{isActive:boolean}>`
    padding: 7px 0;
    font-size: 12px; font-weight: bold;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.boxTextColor};
    text-align: center; 
    text-transform: uppercase;
    background-color: ${props => props.theme.listColor}; 
    border-radius: 10px;

    a {
        display: block;
        padding: 7px 0;
    }
`

interface RouteParams{
    coinId: string;
}

interface RouteState{
    name: string;
}

interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
    USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        };
    };
}

function Coin(){
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price")
    const chartMatch = useRouteMatch("/:coinId/chart")
    // const [ loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    const {isLoading : infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading : tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

    /*
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();

            const priceData = await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [])
    */

    const loading = infoLoading || tickersLoading;

    return (

        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
            <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{`$${tickersData?.quotes.USD.price.toFixed(3)}`}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Supply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/Chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/Price`}>Price</Link>
                </Tab>
            </Tabs>

            <Switch>
                <Route path={`/${coinId}/price`}>
                    <Price coinId={coinId} />
                </Route>
                <Route path={`/${coinId}/Chart`}>
                    <Chart coinId={coinId} />
                </Route>
            </Switch>
        </>
    )}

        </Container>
    )
}

export default Coin;