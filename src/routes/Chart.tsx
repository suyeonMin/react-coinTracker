import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps{
    coinId : string;
}

interface IHistorical {
    time_open: string,
    time_close: string,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    market_cap: number,
}

function Chart({coinId}: ChartProps){
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlc", coinId], () => fetchCoinHistory(coinId));

    //console.log(data);
    
    return <div>
        {isLoading ? "Loading chart..." : <ApexCharts 
            type="candlestick" 
            series={[
                {
                    data: data?.map(price => ({
                        x: new Date(+price.time_close * 1000).toISOString(),
                        y: [price.open, price.high, price.low, price.close],
                    })) ?? [],
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light"
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: true
                    },
                    background: "transparent"
                },
                stroke: {
                    curve: "smooth",
                    width: 3,
                },
                grid: {
                    
                },
                yaxis: {
                },
                xaxis: {
                    type: "datetime"
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(2)}`
                    }
                }
            }} />
        }
    </div>
}

export default Chart;