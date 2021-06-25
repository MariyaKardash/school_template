import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import CurrencyExchange from './CurrencyExchange.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact><Redirect to="/widget"/></Route>
                <Route path="/widget" exact component={CurrencyExchange}></Route>
                <Route path="/widget/:base/:convertTo" exact component={CurrencyExchange}></Route>
                <Route><h1>Page not found)</h1></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router