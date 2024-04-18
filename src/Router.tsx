import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Btn from "./routes/BtnHome"

interface IRouterProps {}

function Router({} : IRouterProps){
    return <BrowserRouter>
        <Route path="/">
            <Btn />
        </Route>
        <Switch>
            <Route path="/:coinId">
                <Coin />
            </Route>
            <Route path="/">
                <Coins />
            </Route>
        </Switch>
    </BrowserRouter>
}

export default Router;