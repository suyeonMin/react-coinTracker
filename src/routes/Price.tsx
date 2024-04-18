import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

const Today = styled.p`
    margin-bottom: 15px;
    font-weight: bold;
`;

const PriceTable = styled.table`
    width: 100%;
    font-size: 13px;
    border-top: 2px solid #fff;
    
    tr {
        th {
            padding: 5px;
            vertical-align: middle;
            border-bottom: 1px solid #fff;
        }

        td {
            padding: 5px;
            text-align: center;
            vertical-align: middle;
            border-bottom: 1px dotted #fff;
        }
    }
`

interface PriceProps{
    coinId : string
}

interface IPrice{
    quotes: {
        USD: {
            price: number;  //시세
            market_cap: number; //시총
            volume_24h: number; //24시간 거래량
            percent_change_24h: number; //1일 변동
            percent_change_7d: number;  //7일 변동
            percent_change_30d: number; //1달 변동
        };
    };
}

function makeMillion(num:number){
    return num / 100000000;
}

function Price({coinId} : PriceProps){
    const {isLoading, data} = useQuery<IPrice>(["price",coinId], () => fetchCoinTickers(coinId));

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return <div>
        <Today>{`Today : ${year}.${month}.${date}`}</Today>
        <PriceTable>
            <thead>
                <tr>
                    <th>시세</th>
                    <th>시총<br />(단위: 억)</th>
                    <th>거래량(24H)<br />(단위: 억)</th>
                    <th>변동(24H)</th>
                    <th>변동(7D)</th>
                    <th>변동(30D)</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>{`${data?.quotes.USD.price.toFixed(2)}$`}</td>
                <td>{data?.quotes.USD.market_cap}</td>
                <td>{data?.quotes.USD.volume_24h}</td>
                <td>{`${data?.quotes.USD.percent_change_24h}%`}</td>
                <td>{`${data?.quotes.USD.percent_change_7d}%`}</td>
                <td>{`${data?.quotes.USD.percent_change_30d}%`}</td>
                </tr>
            </tbody>
        </PriceTable>
    </div>
}

export default Price;